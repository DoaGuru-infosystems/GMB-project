const db = require("../config/db");

exports.submitReview = (req, res) => {
  const { clientId, rating } = req.body;
  const fullName = req.body.fullName || req.body.name;
  const email = req.body.email || null;
  const mobile = req.body.mobile || null;
  const review = req.body.review || req.body.message;

  const isPositive = rating >= 4;

  const insertReview = (placeId) => {
    const query = "INSERT INTO reviews (clientId, fullName, email, mobile, rating, review, isPositive) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [clientId, fullName, email, mobile, rating, review, isPositive],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error submitting review" });
        }

        if (isPositive) {
          return res.json({
            redirect: "google",
            url: `https://search.google.com/local/writereview?placeid=${placeId}`,
          });
        } else {
          return res.json({ redirect: "internal" });
        }
      }
    );
  };

  if (clientId === 'admin' || clientId === 'admin') {
    const adminPlaceId = 'ChIJT-5eGRaxgTkRxyMc7_psGWI';
    return insertReview(adminPlaceId);
  }

  // 1. Get client placeId
  db.query(
    "SELECT placeId FROM clients WHERE clientId = ?",
    [clientId],
    (err, clientResult) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (clientResult.length === 0) {
        return res.status(400).json({ message: "Client not found" });
      }

      insertReview(clientResult[0].placeId);
    }
  );
};

// Admin dashboard ke liye
// Admin dashboard ke liye - Sare reviews with Business Name
exports.getAllReviews = (req, res) => {
  const { clientId, dateRange, startDate, endDate, rating, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    FROM reviews r
    LEFT JOIN clients c ON r.clientId = c.clientId
    WHERE 1=1
  `;
  const params = [];

  if (clientId && clientId !== 'all') {
    query += " AND r.clientId = ?";
    params.push(clientId);
  }

  if (rating && rating !== 'all') {
    query += " AND r.rating = ?";
    params.push(parseInt(rating));
  }

  if (dateRange) {
    if (dateRange === 'Custom Range' && startDate && endDate) {
      query += " AND r.createdAt >= ? AND r.createdAt <= ?";
      params.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
    } else if (dateRange === 'This Month') {
      query += " AND MONTH(r.createdAt) = MONTH(NOW()) AND YEAR(r.createdAt) = YEAR(NOW())";
    } else if (dateRange === 'Last Month') {
      query += " AND r.createdAt >= DATE_SUB(DATE_FORMAT(NOW() ,'%Y-%m-01'), INTERVAL 1 MONTH) AND r.createdAt < DATE_FORMAT(NOW() ,'%Y-%m-01')";
    } else if (dateRange === 'Last 3 Months') {
      query += " AND r.createdAt >= DATE_SUB(NOW(), INTERVAL 3 MONTH)";
    } else if (dateRange === 'Last 6 Months') {
      query += " AND r.createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)";
    } else if (dateRange === 'Last 12 Months') {
      query += " AND r.createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)";
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
      SELECT r.*, 
      CASE 
        WHEN r.clientId = 'admin' THEN 'DOAGuru'
        ELSE c.businessName 
      END as businessName
      ${query}
      ORDER BY r.createdAt DESC
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
    
    // Convert business name and keywords to Hindi fallback if language is Hindi
    const hindiKeys = translateKeywordsToHindi(keywords);
    
    const fallbackMap = {
      hindi: `दिल से कहूं तो ${bName} का अनुभव बहुत ही शानदार रहा। ${hindiKeys} के मामले में इनका काम लाजवाब है और यहाँ की टीम का व्यवहार बहुत ही सहयोगी था। मैं बिना किसी संकोच के यहाँ जाने का सुझाव दूँगा!`,
      hinglish: `Yaar, ${bName} ka experience sach mein solid tha! ${keysStr} ke liye gaye the aur bilkul satisfied hokar nikle. Dobaara zaroor aaunga, recommend bhi karunga!`,
      english: `Honestly, really happy with my experience at ${bName}. The ${keysStr} was handled so well — felt like they actually cared. Would go back without a second thought!`
    };
    return res.json({ generatedReview: fallbackMap[language] || fallbackMap.english });
  }

  const keysStr = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'services');

  // Random sentence starters to add variety and avoid robotic sameness
  const englishStarters = [
    `Honestly`, `Really happy with`, `So glad I found`,
    `Big shoutout to`, `Just had to say`, `Went to`
  ];
  const hinglishStarters = [
    `Yaar`, `Sach mein`, `Bhai`, `Seedha bolunga`, `Honestly bolunga toh`
  ];
  const hindiStarters = [
    `सच में`, `दिल से कहूं तो`, `बस इतना कहना था`,
    `खुश हूँ कि मैंने इन्हें चुना`, `यहाँ का अनुभव बेहद शानदार रहा`
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // Use exact business name — never a placeholder
  const bizName = (businessName && businessName.trim()) ? businessName.trim() : null;

  // Rules appended to every prompt to strip AI-giveaway punctuation
  const antiAiRules = `
STRICT OUTPUT RULES. These are non-negotiable:
- The business name in this review MUST be exactly: ${bizName || 'the business'}. Do NOT replace it with XYZ, ABC, [Business Name], *Business Name*, or any other placeholder.
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

Start the review with: ${pick(englishStarters)}

Write casually like a real person on their phone. 2 to 3 sentences only. Use the business name ${bizName || 'the business'} exactly as written. Avoid corporate words like top-notch, seamless, stellar, commendable.
${antiAiRules}`,

    hinglish: `Tu ek customer ki taraf se Google review likh raha hai.

Business ka naam: ${bizName || 'yeh business'}
Customer ne use kiya: ${keysStr}

Review ki shuruat kar: ${pick(hinglishStarters)}

Likh jaise WhatsApp pe dost ko bata raha ho. Hinglish mein likh, Devanagari nahi. 2 se 3 lines max. Business name ${bizName || 'yeh business'} exactly waise hi use karna. Top-notch, seamless wale words avoid karna.
${antiAiRules}`,

    hindi: `Aap ek customer ki taraf se Google review likh rahe hain.

Business ka naam: ${bizName || 'यह जगह'}
Customer ka anubhav / keywords: ${keysStr}

Review ki shuruat karein: ${pick(hindiStarters)}

STRICT RULES FOR HINDI LANGUAGE:
- Write the entire review in PURE HINDI using Devanagari script ONLY.
- Do NOT use any English alphabets/letters (like A-Z, a-z).
- Do NOT write English words in Devanagari script (e.g. do NOT write words like "helpful", "cooperative", "recommend", "best", "school", "faculty", "marketing", "teaching", "service", "support" as "हेल्पफुल", "कोऑपरेटिव", "रिकमेंड", "बेस्ट", "स्कूल", "फैकल्टी", "मार्केटिंग", "टीचिंग" etc.).
- Convert and translate ALL English keywords and words into natural, native, simple Hindi words (e.g. translate "best" to "सर्वश्रेष्ठ" or "उत्कृष्ट" or "शानदार", "cooperative" to "मददगार" or "सहयोगी", "recommend" to "सलाह देता हूँ" or "सुझाव दूँगा", "teaching" to "पढ़ाना" or "शिक्षण कार्य", "faculty" to "स्टाफ और शिक्षक", "communication" to "सम्पर्क और बातचीत", "helpful" to "मददगार").
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
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

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
        max_tokens: 150,
        temperature: 0.9
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      console.error("AI API Error:", data);
      throw new Error(data.error?.message || "AI API Error");
    }

    // Strip AI-giveaway punctuation and placeholder patterns
    const rawText = data.choices[0].message.content.trim();
    let generatedText = rawText
      .replace(/[\u201C\u201D\u201E]/g, '')     // remove fancy double quotes
      .replace(/\*+([^*]*)\*+/g, '$1')          // strip *asterisk* wrapping
      .replace(/\[([^\]]+)\]/g, '$1')           // strip [bracket] wrapping
      .replace(/\u2014|\u2013/g, ',')           // em/en dash to comma
      .replace(/\.{2,}/g, '.')                  // ellipsis to single period
      .replace(/[()\[\]]/g, '')                 // remove leftover parens/brackets
      .replace(/;/g, ',')                       // semicolon to comma
      .replace(/^["']+|["']+$/g, '')            // strip wrapping straight quotes
      // Replace AI placeholder patterns with actual business name
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
      hindi: `दिल से कहूं तो ${bName} का काम सच में लाजवाब है। ${hindiKeys} के मामले में इनकी सेवा बहुत शानदार थी, और यहाँ के स्टाफ का व्यवहार बेहद मददगार रहा। मैं बिना सोचे दूसरों को यहाँ आने की सलाह दूँगा!`,
      hinglish: `Bhai, ${bName} gaya tha ${fallbackKeys} ke liye aur honestly expected se kaafi better raha. Team bhi bahut helpful thi. Next time bhi yehi choice hogi!`,
      english: `Really glad I went with ${bName} for ${fallbackKeys}. The whole thing was smooth and the team was genuinely helpful. Solid experience, will be back!`
    };
    res.json({ generatedReview: fallbackMap[language] || fallbackMap.english });
  }
};