const db = require("../config/db");

exports.submitReview = async (req, res) => {
  const { clientId, rating } = req.body;
  const fullName = req.body.fullName || req.body.name;
  const email = req.body.email || null;
  const mobile = req.body.mobile || null;
  const review = req.body.review || req.body.message;

  const isPositive = rating >= 4 ? 1 : 0;
  const connection = db.promise();

  const insertReview = async (clientDbId, placeId) => {
    try {
      const query = "INSERT INTO reviews (client_id, customer_name, customer_email, customer_mobile, rating, review, is_positive) VALUES (?, ?, ?, ?, ?, ?, ?)";
      await connection.query(
        query,
        [clientDbId, fullName, email, mobile, rating, review, isPositive]
      );

      if (isPositive) {
        return res.json({
          redirect: "google",
          url: `https://search.google.com/local/writereview?placeid=${placeId}`,
        });
      } else {
        return res.json({ redirect: "internal" });
      }
    } catch (err) {
      console.error("Error inserting review:", err);
      return res.status(500).json({ message: "Error submitting review" });
    }
  };

  // 1. Get client database ID and placeId
  try {
    const [clientResult] = await connection.query(
      `SELECT c.id, b.place_id as placeId 
       FROM clients c 
       LEFT JOIN businesses b ON b.client_id = c.id 
       WHERE c.clientId = ?`,
      [clientId]
    );

    if (clientResult.length === 0) {
      if (clientId === 'admin') {
        const fallbackPlaceId = 'ChIJT-5eGRaxgTkRxyMc7_psGWI';
        return await insertReview(null, fallbackPlaceId);
      }
      return res.status(400).json({ message: "Client not found" });
    }

    const placeId = clientResult[0].placeId || (clientId === 'admin' ? 'ChIJT-5eGRaxgTkRxyMc7_psGWI' : '');
    await insertReview(clientResult[0].id, placeId);
  } catch (err) {
    console.error("Database error in submitReview:", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// Admin dashboard reviews list
exports.getAllReviews = (req, res) => {
  const { clientId, dateRange, startDate, endDate, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    FROM reviews r
    LEFT JOIN clients c ON r.client_id = c.id
    LEFT JOIN businesses b ON b.client_id = c.id
    WHERE 1=1
  `;
  const params = [];

  if (clientId && clientId !== 'all') {
    if (clientId === 'admin') {
      query += " AND (r.client_id IS NULL OR c.clientId = 'admin')";
    } else {
      query += " AND c.clientId = ?";
      params.push(clientId);
    }
  }

  if (dateRange) {
    if (dateRange === 'Custom Range' && startDate && endDate) {
      query += " AND r.created_at >= ? AND r.created_at <= ?";
      params.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
    } else if (dateRange === 'This Month') {
      query += " AND MONTH(r.created_at) = MONTH(NOW()) AND YEAR(r.created_at) = YEAR(NOW())";
    } else if (dateRange === 'Last Month') {
      query += " AND r.created_at >= DATE_SUB(DATE_FORMAT(NOW() ,'%Y-%m-01'), INTERVAL 1 MONTH) AND r.created_at < DATE_FORMAT(NOW() ,'%Y-%m-01')";
    } else if (dateRange === 'Last 3 Months') {
      query += " AND r.created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)";
    } else if (dateRange === 'Last 6 Months') {
      query += " AND r.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)";
    } else if (dateRange === 'Last 12 Months') {
      query += " AND r.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)";
    }
  }

  const countQuery = `SELECT COUNT(*) as total ${query}`;

  db.query(countQuery, params, (err, countResult) => {
    if (err) {
      console.error("Error in getAllReviews count:", err);
      return res.status(500).json({ message: "DB Error" });
    }

    const total = countResult[0].total;
    const dataQuery = `
      SELECT r.id, r.customer_name as fullName, r.customer_mobile as mobile, r.customer_email as email,
             r.rating, r.review, r.is_positive as isPositive, r.created_at as createdAt,
             c.clientId,
             CASE 
               WHEN r.client_id IS NULL THEN 'DOAGuru'
               ELSE b.business_name 
             END as businessName
      ${query}
      ORDER BY r.created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.query(dataQuery, [...params, parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) {
        console.error("Error in getAllReviews data:", err);
        return res.status(500).json({ message: "DB Error" });
      }
      res.json({
        reviews: results,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit)
        }
      });
    });
  });
};

const translateKeywordsToHindi = (keywords) => {
  if (!keywords) return 'शानदार सेवा और काम';
  let keysStr = Array.isArray(keywords) ? keywords.join(', ') : String(keywords);
  
  const dictionary = {
    'standard teaching skills': 'बेहतरीन शिक्षण शैली',
    'learning to student is the best way': 'छात्रों को सिखाने का सर्वश्रेष्ठ तरीका',
    'learning to student': 'छात्रों को सिखाने का तरीका',
    'digital marketing': 'डिजिटल मार्केटिंग',
    'best school': 'सर्वश्रेष्ठ स्कूल',
    'good faculty': 'अच्छा स्टाफ और शिक्षक',
    'great service': 'शानदार सेवा',
    'teaching': 'शिक्षण कार्य',
    'faculty': 'शिक्षक गण',
    'communication': 'सम्पर्क और बातचीत',
    'services': 'सेवाएं',
    'cooperative': 'सहयोगी',
    'recommend': 'सलाह',
    'helpful': 'मददगार',
    'support': 'सहायता',
    'quality': 'गुणवत्ता',
    'pricing': 'उचित दाम',
    'speed': 'तेजी',
    'delivery': 'डिलीवरी'
  };

  let text = keysStr.toLowerCase();
  
  // Replace long phrases first
  Object.keys(dictionary).forEach(key => {
    const regex = new RegExp(key, 'g');
    text = text.replace(regex, dictionary[key]);
  });

  // Individual words fallback translation
  text = text.replace(/\bschool\b/g, 'स्कूल')
             .replace(/\bbest\b/g, 'सर्वश्रेष्ठ')
             .replace(/\bgood\b/g, 'अच्छा')
             .replace(/\bteaching\b/g, 'शिक्षण')
             .replace(/\blearning\b/g, 'सीखने')
             .replace(/\bstudent\b/g, 'छात्र')
             .replace(/\bway\b/g, 'तरीका')
             .replace(/\bcooperative\b/g, 'सहयोगी')
             .replace(/\brecommend\b/g, 'सलाह')
             .replace(/\bhelpful\b/g, 'मददगार')
             .replace(/\bmarketing\b/g, 'मार्केटिंग')
             .replace(/\bdigital\b/g, 'डिजिटल');
             
  return text;
};

exports.generateReview = async (req, res) => {
  const { keywords, businessName, language = 'english' } = req.body;
  console.log('[generateReview] Received → businessName:', businessName, '| language:', language, '| keywords:', keywords);

  if (!process.env.OPENAI_API_KEY) {
    const keysStr = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'great service');
    const bName = businessName || 'this place';
    
    const hindiKeys = translateKeywordsToHindi(keywords);
    
    const fallbackMap = {
      hindi: `${bName} का अनुभव बहुत ही शानदार रहा। ${hindiKeys} के मामले में इनका काम उत्कृष्ट है और यहाँ की टीम का व्यवहार बहुत ही सहयोगी था। मैं सभी को यहाँ आने का सुझाव देता हूँ!`,
      hinglish: `${bName} ka experience bahut badhiya raha. ${keysStr} ke liye inka kaam sach mein accha hai aur staff bhi supportive tha. Main sabhi ko yahan aane ki salah dunga.`,
      english: `Very satisfied with my experience at ${bName}. The service for ${keysStr} was handled professionally and the team was supportive. I highly recommend them.`
    };
    return res.json({ generatedReview: fallbackMap[language] || fallbackMap.english });
  }

  const keysStr = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'services');

  const bizName = (businessName && businessName.trim()) ? businessName.trim() : null;

  const antiAiRules = `
STRICT OUTPUT RULES. These are non-negotiable:
- The business name in this review MUST be exactly: ${bizName || 'the business'}. Do NOT replace it with XYZ, ABC, [Business Name], *Business Name*, or any other placeholder.
- Do NOT use any emojis, icons, stars, or special symbols (like 🌟, 👍, 😊, ★, etc.). Use only plain text.
- Do not use double quotes anywhere. Not even once.
- Do not use em dash or en dash. No special dash characters.
- Do not use ellipsis. No trailing dots.
- Do not use parentheses or brackets.
- Do not use semicolons.
- Do not use asterisks anywhere.
- Use only simple punctuation like period, comma, and one exclamation mark maximum.
- Output only the raw review text. No intro, no label, no explanation at all.`;

  const promptMap = {
    english: `You are writing a short honest Google review on behalf of a customer.

The business being reviewed is called: ${bizName || 'the business'}
The customer used these services: ${keysStr}

Write a natural, simple, and highly realistic review. Start directly with the business name or a natural statement about your experience.
Avoid template-like starters such as "Honestly", "Really happy with", "Just had to say", "Big shoutout to". 
Avoid cliché phrases and literal idioms like "without a second thought" or "without thinking twice". Do NOT always write recommendation sentences like "highly recommend them" or "highly recommended" at the end of every review. Also, avoid overusing repetitive phrases like "Very satisfied with the service" or "Very happy with the service". Real customer reviews vary.
Vary the ending style dynamically every time you generate to keep it organic. 
- In some generations, do NOT write any recommendation or return statements at all (it should just end naturally with a simple sentence describing the experience, staff behavior, or the service itself, without concluding templates).
- In other generations, you can write about coming back (e.g., indicating you will return in the future), or expressing satisfaction/gratitude.
- Randomly alternate between these styles so that sequentially generated reviews never look similar or share the same pattern.
Write casually like a real person on their phone. 2 to 3 sentences only. Use the business name ${bizName || 'the business'} exactly as written. Avoid corporate words like top-notch, seamless, stellar, commendable.
${antiAiRules}`,

    hinglish: `Tu ek customer ki taraf se Google review likh raha hai.

Business ka naam: ${bizName || 'yeh business'}
Customer ne use kiya: ${keysStr}

Review ko bilkul realistic aur natural rakhna. Shuruat seedhe business name ya natural experience statement se karna (jaise "${bizName || 'yeh business'} mein experience bohot sahi raha" ya "yahan ka treatment bohot accha hai").
OVERLY FRIENDLY AUR CASUAL SLANG BILKUL USE MAT KARNA. "Yaar", "Bhai", "Bhaiya", "Dosto", "Honestly bolunga toh", "Seedha bolunga", "bina soche", "bina soche samjhe" jaise keywords bilkul use NAHI hone chahiye. Ek mature/real customer ki tarah Hinglish mein likh, Devanagari nahi. 2 to 3 lines max. Business name ${bizName || 'yeh business'} exactly waise hi use karna. Top-notch, seamless wale words avoid karna.
Hinglish review ke end mein hamesha "highly recommend", "zaroor suggest karunga", "very satisfied", ya "will definitely return" jaise cliché words use mat karna.
Endings ko dynamically vary karo:
- Kuch reviews mein bilkul normal ending rakho bina koi extra recommendation ya returning status likhe (jaise staff helpful tha, ya kaam accha laga).
- Kuch reviews mein return hone ka intention ya general positive comment dalo.
- Har generation mein randomly style badalna chahiye taaki sequential reviews repetitive ya automated na lagein.
${antiAiRules}`,

    hindi: `Aap ek customer ki taraf se Google review likh rahe hain.

Business ka naam: ${bizName || 'यह जगह'}
Customer ka anubhav / keywords: ${keysStr}

Review ko bilkul realistic, seedha aur natural rakhein. Shuruat seedhe business name ya anubhav se karein.
Cheesy ya overly-friendly phrases jaise "Yaar", "Bhai", "दिल से कहूं तो", "बस इतना कहना था", "खुश हूँ कि मैंने इन्हें चुना", "बिना सोचे", "बिना सोचे समझे", "बिना दोबारा सोचे" bilkul use NA karein. Ek aam, mature customer ki tarah likhein.

STRICT RULES FOR HINDI LANGUAGE:
- Write the entire review in PURE HINDI using Devanagari script ONLY.
- Do NOT use any English alphabets/letters (like A-Z, a-z) except for the exact business name "${bizName || 'the business'}".
- Do NOT write English words in Devanagari script (e.g. do NOT write words like "helpful", "cooperative", "recommend", "best", "school", "faculty", "marketing", "teaching", "service", "support" as "हेल्पफुल", "कोऑपरेटिव", "रिकमेंड", "बेस्ट", "स्कूल", "फैकल्टी", "मार्केटिंग", "टीचिंग" etc.).
- Do NOT translate English idioms literally (e.g. do NOT translate "without a second thought" or "without thinking" to "बिना सोचे", "बिना सोचे समझे", or "बिना किसी संकोच के"). Instead, use natural Hindi recommendations like "मैं यहाँ आने का सुझाव देता हूँ" or "मैं निश्चित रूप से यहाँ आने की सलाह दूँगा".
- Do NOT use ambiguous pronoun references like "मैं उन्हें सुझाव देता हूँ" or "मैं उन्हें सलाह देता हूँ" or "पूर्ण भरोसा के साथ" (since it is unclear who "उन्हें" refers to). Instead, refer directly to the business/services or recommend the place directly, e.g., use "मैं यहाँ आने की सलाह देता हूँ", "मैं यहाँ जाने की सलाह दूँगा", or "यहाँ की सेवाओं पर पूरा भरोसा किया जा सकता है".
- Do NOT translate "recommend", "highly recommend", or "endorse" as "इसे स्वीकार करूँ", "स्वीकार करूँ", "स्वीकार करना", or similar terms of acceptance/approval. Use natural recommendation verbs like "सलाह देता हूँ", "सुझाव देता हूँ", "सिफारिश करता हूँ", or "यहाँ आने के लिए बोलूँगा".
- Do NOT overuse recommendation words like "सुझाता हूँ", "सुझाव देता हूँ", or "सलाह देता हूँ" at the end of every review. Also, avoid repetitive ending statements like "यहाँ की सेवाएँ बहुत अच्छी लगीं" or "मैं यहाँ वापस आऊँगा". Introduce variety in the concluding sentences, or omit the recommendation/satisfaction statement entirely.
- Vary the ending statement dynamically.
  - In some generations, do NOT write any recommendation or return statements at all (it should just end naturally with a simple sentence describing the experience, staff behavior, or the service itself, without concluding templates).
  - In other generations, you can write about coming back (e.g., returning for future needs), thanking the team, or expressing satisfaction in fresh words.
  - Randomly alternate between these styles so that sequentially generated reviews never look similar or share the same pattern.
- Convert and translate ALL English keywords and words into natural, native, simple Hindi words (e.g. translate "best" to "सर्वश्रेष्ठ" or "उत्कृष्ट" or "शानदार", "cooperative" to "मददगार" or "सहयोगी", "recommend" to "सलाह देता हूँ" or "सुझाव दूँगा", "teaching" to "पढ़ाना" or "शिक्षण कार्य", "faculty" to "स्टाफ और शिक्षक", "communication" to "सम्पर्क aur बातचीत", "helpful" to "मददगार").
- Ensure the tone is friendly, warm, casual, and feels completely like an authentic Indian customer writing a genuine review.
- 2 to 3 sentences max.
${antiAiRules}`
  };

  const prompt = promptMap[language] || promptMap.english;

  const apiKey = process.env.OPENAI_API_KEY;
  const isCustomKey = apiKey && apiKey.startsWith('sk-or-');
  const apiUrl = isCustomKey
    ? 'https://openrouter.ai/api/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';
  const apiModel = isCustomKey ? "openai/gpt-3.5-turbo" : "gpt-3.5-turbo";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 350,
        temperature: 0.85
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      console.error("AI API Error:", data);
      throw new Error(data.error?.message || "AI API Error");
    }

    const rawText = data.choices[0].message.content.trim();
    let generatedText = rawText
      .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')
      .replace(/[★☆🌟✨⭐]/g, '')
      .replace(/[\u201C\u201D\u201E]/g, '')
      .replace(/\*+([^*]*)\*+/g, '$1')
      .replace(/\[([^\]]+)\]/g, '$1')
      .replace(/\u2014|\u2013/g, ',')
      .replace(/\.{2,}/g, '.')
      .replace(/[()\[\]]/g, '')
      .replace(/;/g, ',')
      .replace(/^["']+|["']+$/g, '')
      .replace(/\*?Business Name\*?/gi, bizName || '')
      .replace(/\[Business Name\]/gi, bizName || '')
      .replace(/\bXYZ\b/g, bizName || '')
      .replace(/\bABC\b/g, bizName || '')
      .replace(/this business/gi, bizName || 'this place')
      .replace(/the business/gi, bizName || 'the place')
      .trim();
    res.json({ generatedReview: generatedText });

  } catch (error) {
    console.error("Error generating review:", error);
    const fallbackKeys = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'great service');
    const bName = businessName || 'this place';
    
    const hindiKeys = translateKeywordsToHindi(keywords);
    
    const fallbackMap = {
      hindi: `${bName} का काम सच में लाजवाब है। ${hindiKeys} के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं निश्चित रूप से यहाँ आने की सलाह दूँगा!`,
      hinglish: `${bName} mein experience bahut accha raha. ${fallbackKeys} ke liye inka kaam sach mein badhiya hai aur staff cooperative tha. Next time bhi yehi choice hogi!`,
      english: `Really glad I went with ${bName} for ${fallbackKeys}. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!`
    };
    res.json({ generatedReview: fallbackMap[language] || fallbackMap.english });
  }
};