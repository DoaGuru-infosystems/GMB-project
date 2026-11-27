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
  const {
    clientId,
    businessName,
    dateRange,
    startDate,
    endDate,
    rating,
    page = 1,
    limit = 10,
  } = req.query;
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

  if (businessName && businessName !== "all") {
    query += " AND b.business_name = ?";
    params.push(businessName);
  }

  if (rating && rating !== "all") {
    query += " AND r.rating = ?";
    params.push(parseInt(rating));
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

    db.query(
      dataQuery,
      [...params, parseInt(limit), parseInt(offset)],
      (err, results) => {
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
            totalPages: Math.ceil(total / limit),
          },
        });
      },
    );
  });
};

const translateKeywordsToHindi = (keywords) => {
  if (!keywords) return "शानदार सेवा और काम";
  let keysStr = Array.isArray(keywords)
    ? keywords.join(", ")
    : String(keywords);

  const dictionary = {
    "standard teaching skills": "बेहतरीन शिक्षण शैली",
    "learning to student is the best way": "छात्रों को सिखाने का सर्वश्रेष्ठ तरीका",
    "learning to student": "छात्रों को सिखाने का तरीका",
    "digital marketing": "डिजिटल मार्केटिंग",
    "best school": "सर्वश्रेष्ठ स्कूल",
    "good faculty": "अच्छा स्टाफ और शिक्षक",
    "great service": "शानदार सेवा",
    "best hospital": "सर्वश्रेष्ठ अस्पताल",
    "multi speciality hospital": "मल्टी स्पेशलिटी अस्पताल",
    "hospital": "अस्पताल",
    "doctor": "डॉक्टर",
    "doctors": "डॉक्टरों",
    "staff": "स्टाफ",
    "care": "देखभाल",
    "quality care": "उत्कृष्ट देखभाल",
    "treatment": "उपचार और इलाज",
    "satisfied": "संतुष्ट",
    "very satisfied": "पूरी तरह संतुष्ट",
    "excellent": "उत्कृष्ट",
    "good": "अच्छा",
    "average": "संतोषजनक",
    teaching: "शिक्षण कार्य",
    faculty: "शिक्षक गण",
    communication: "सम्पर्क और बातचीत",
    services: "सेवाएं",
    cooperative: "सहयोगी",
    recommend: "सलाह",
    helpful: "मददगार",
    support: "सहायता",
    quality: "गुणवत्ता",
    pricing: "उचित दाम",
    speed: "तेजी",
    delivery: "डिलीवरी",
  };

  let text = keysStr.toLowerCase();

  // Replace long phrases first
  Object.keys(dictionary).forEach((key) => {
    const regex = new RegExp(key, "gi");
    text = text.replace(regex, dictionary[key]);
  });

  // Individual words fallback translation
  text = text
    .replace(/\bschool\b/gi, "स्कूल")
    .replace(/\bhospital\b/gi, "अस्पताल")
    .replace(/\bdoctor\b/gi, "डॉक्टर")
    .replace(/\bdoctors\b/gi, "डॉक्टरों")
    .replace(/\bbest\b/gi, "सर्वश्रेष्ठ")
    .replace(/\bgood\b/gi, "अच्छा")
    .replace(/\bteaching\b/gi, "शिक्षण")
    .replace(/\blearning\b/gi, "सीखने")
    .replace(/\bstudent\b/gi, "छात्र")
    .replace(/\bway\b/gi, "तरीका")
    .replace(/\bcooperative\b/gi, "सहयोगी")
    .replace(/\brecommend\b/gi, "सलाह")
    .replace(/\bhelpful\b/gi, "मददगार")
    .replace(/\bmarketing\b/gi, "मार्केटिंग")
    .replace(/\bdigital\b/gi, "डिजिटल");

  return text;
};

exports.generateReview = async (req, res) => {
  const { clientId, keywords, businessName, language = "english", feedbackDetails } = req.body;
  console.log(
    "[generateReview] Received → clientId:",
    clientId,
    "| businessName:",
    businessName,
    "| language:",
    language,
    "| feedbackDetails count:",
    Array.isArray(feedbackDetails) ? feedbackDetails.length : 0,
    "| keywords:",
    keywords,
  );

  // 1. Fetch active client target keywords from database
  let clientTargetKeywords = [];
  try {
    if (clientId && clientId !== 'admin') {
      const connection = db.promise();
      const [keywordRows] = await connection.query(
        `SELECT k.keyword_name 
         FROM keywords k 
         JOIN clients c ON k.client_id = c.id 
         WHERE c.clientId = ? AND k.is_active = 1`,
        [clientId]
      );
      if (keywordRows && keywordRows.length > 0) {
        clientTargetKeywords = keywordRows.map(r => r.keyword_name.trim()).filter(Boolean);
      }
    }
  } catch (dbErr) {
    console.error("[generateReview] DB error fetching client keywords:", dbErr);
  }

  // 2. Randomize target keywords: pick 1 to 2 random target keywords
  let selectedTargetKeywords = [];
  if (clientTargetKeywords.length > 0) {
    const shuffled = [...clientTargetKeywords].sort(() => 0.5 - Math.random());
    const count = clientTargetKeywords.length === 1 ? 1 : (Math.random() < 0.65 ? 1 : 2);
    selectedTargetKeywords = shuffled.slice(0, count);
  }

  // Fallback target keywords if none configured in DB
  const targetKeywordsStr = selectedTargetKeywords.length > 0
    ? selectedTargetKeywords.join(", ")
    : (Array.isArray(keywords) ? keywords.join(", ") : (keywords || ""));

  // 3. Format structured questions and answers from customer feedback
  let formattedFeedback = "";
  let customerAnswersList = [];
  if (Array.isArray(feedbackDetails) && feedbackDetails.length > 0) {
    formattedFeedback = feedbackDetails
      .filter(item => item && item.question && Array.isArray(item.answers) && item.answers.length > 0)
      .map(item => {
        customerAnswersList.push(...item.answers);
        return `- Question: ${item.question}\n  Customer's Answer: ${item.answers.join(", ")}`;
      })
      .join("\n");
  } else if (keywords) {
    const kStr = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    customerAnswersList.push(kStr);
    formattedFeedback = `- Customer Feedback: ${kStr}`;
  }

  const customerAnswersStr = customerAnswersList.filter(Boolean).join(", ");
  const bizName = (businessName && businessName.trim()) ? businessName.trim() : null;
  const bNameFallback = bizName || 'this place';

  console.log("[generateReview] Selected Target Keyword(s):", targetKeywordsStr);
  console.log("[generateReview] Formatted Customer Feedback:\n", formattedFeedback);

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const fallbackKeys = targetKeywordsStr || customerAnswersStr || "services";
    const hindiKeys = translateKeywordsToHindi(fallbackKeys);

    const fallbackMap = {
      hindi: `${bNameFallback} का अनुभव बहुत ही अच्छा रहा। ${hindiKeys} के मामले में यहाँ की व्यवस्था और स्टाफ का व्यवहार काफी सहयोगी रहा।`,
      hinglish: `${bNameFallback} ka experience sach mein badhiya raha! ${fallbackKeys} aur staff dono helpful the, fully satisfied!`,
      english: `Had a very good experience at ${bNameFallback}. ${targetKeywordsStr ? `They are truly dependable for ${targetKeywordsStr} and ` : ''}the staff was attentive and professional.`
    };
    return res.json({
      generatedReview: fallbackMap[language] || fallbackMap.english,
    });
  }

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
- Do not write bullet points, questions, or labels like 'Answer'. Output MUST be one flowing, continuous paragraph.
- Use only simple punctuation like period, comma, and one exclamation mark maximum.
- Output only the raw review text. No intro, no label, no explanation at all.`;

  const promptMap = {
    english: `You are writing a natural, simple, and highly realistic Google review on behalf of a genuine customer.
The business being reviewed is called: ${bizName || "the business"}
Target SEO keyword(s) to naturally include (1-2 keywords): ${targetKeywordsStr || "services"}
The customer answered the following feedback questions about their experience:
${formattedFeedback || "- Positive experience with the team"}

Instructions:
- Write a natural, simple, and highly realistic review. Start directly with the business name or a natural statement about your experience.
- Naturally reflect the customer's specific answers and sentiments from the feedback questions provided above.
- Naturally integrate the target SEO keyword "${targetKeywordsStr}" and the exact business name "${bizName || 'the business'}" into the sentences without feeling forced.
- Avoid template-like starters such as "Honestly", "Really happy with", "Just had to say", "Big shoutout to". 
- Avoid cliché phrases and literal idioms like "without a second thought" or "without thinking twice". Do NOT always write recommendation sentences like "highly recommend them" or "highly recommended" at the end of every review. Real customer reviews vary.
- Vary the ending style dynamically: sometimes end naturally with a sentence describing the staff, service quality, or execution without concluding templates; sometimes express satisfaction or returning.
- Write casually like a real person on their phone. 2 to 4 sentences. Avoid corporate buzzwords like top-notch, seamless, stellar, commendable.
${antiAiRules}`,

    hinglish: `CRITICAL INSTRUCTION: You MUST write the entire review in HINGLISH (Hindi spoken language written using Roman / English alphabet, exactly like urban Indians chat on WhatsApp or write reviews on Google).
DO NOT write in pure English. Pure English output is completely forbidden and invalid.

The business being reviewed is: ${bizName || "the business"}
Target SEO keyword(s) to include naturally: ${targetKeywordsStr || "services"}
Customer Feedback details from their visit / purchase:
${formattedFeedback || "- Positive experience with the team"}

Hinglish Writing Rules:
- The grammatical sentence structure of EVERY sentence MUST be conversational Hindi, written in English letters.
  Example pattern:
  "${bizName} ke sath experience kaafi accha raha. Yahan ki team aur staff kaafi helpful aur responsive hai. Inka kaam properly handle hua aur services reliable lagi."
- Naturally weave in whatever answers the customer chose in the feedback form into their personal experience.
- Seamlessly fit the exact business name "${bizName || 'the business'}" and target keyword "${targetKeywordsStr}".
- 2 to 4 natural sentences. Do not use crude street slang ("Yaar", "Bhai", "bina soche samjhe"). Keep it authentic, mature, and realistic.
- Avoid repeating the same ending cliché ("highly recommend", "must visit") in every generation. Keep the ending natural and varied.
${antiAiRules}`,

    hindi: `आप एक वास्तविक ग्राहक की ओर से Google Maps के लिए एक स्वाभाविक और सहज हिंदी (Devanagari) समीक्षा लिख रहे हैं।
व्यवसाय का नाम: ${bizName || "यह संस्थान"}
शामिल करने योग्य मुख्य विषय/कीवर्ड: ${targetKeywordsStr || "उत्कृष्ट सेवाएं"}
ग्राहक के अनुभव और फॉर्म में चुने गए उत्तर:
${formattedFeedback || "- बहुत अच्छा अनुभव रहा"}

हिंदी भाषा और शैली के आवश्यक नियम:
- समीक्षा आम बोलचाल की सहज हिंदी (देवनागरी लिपि) में होनी चाहिए, जैसे वास्तविक लोग Google पर स्वाभाविक रिव्यू लिखते हैं।
- बिल्कुल भी किताबी, कठिन या गूगल ट्रांसलेट जैसी अनुवादित अजीब भाषा न लिखें (जैसे शाब्दिक मशीनी अनुवाद न करें; बोलचाल के सामान्य शब्दों जैसे टीम, स्टाफ, सर्विस, काम, सुविधा आदि का सहज प्रयोग करें)।
- ग्राहक ने फॉर्म में जो भी विकल्प चुने हैं, उन्हें समीक्षा के वाक्यों में स्वाभाविक रूप से पिरोएं।
- व्यवसाय का नाम "${bizName || 'यह संस्थान'}" जैसा है वैसा ही लिखें।
- वाक्य रचना 2 से 4 वाक्यों की होनी चाहिए। बनावटी तारीफ या हर बार एक जैसा घिसा-पिटा अंत करने से बचें।
${antiAiRules}`
  };

  const prompt = promptMap[language] || promptMap.english;

  /*
  // PREVIOUS AI INTEGRATION (OpenAI / HuggingFace - Commented out as requested)
  const isHfKey = apiKey && apiKey.startsWith('hf_');
  const isOpenRouterKey = apiKey && apiKey.startsWith('sk-or-');

  let apiUrl = 'https://api.openai.com/v1/chat/completions';
  let apiModel = 'gpt-3.5-turbo';

  if (isHfKey) {
    apiUrl = 'https://router.huggingface.co/v1/chat/completions';
    apiModel = 'meta-llama/Llama-3.1-8B-Instruct';
  } else if (isOpenRouterKey) {
    apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    apiModel = 'openai/gpt-3.5-turbo';
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 350,
        temperature: 0.85
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    ...
  } catch (error) { ... }
  */

  // --- OPENROUTER AI INTEGRATION ---
  const siteUrl = process.env.SITE_URL || 'https://gmbreviews.siarasystems.com';
  const siteName = process.env.SITE_NAME || 'GMB Review System';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s safety timeout

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': siteUrl,
        'X-Title': siteName,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 350,
        temperature: 0.85,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API Error:", data);
      throw new Error(data.error?.message || "OpenRouter API Error");
    }

    const rawText = data.choices?.[0]?.message?.content?.trim();
    if (!rawText) {
      throw new Error("No review text generated by OpenRouter");
    }

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

    res.json({ 
      generatedReview: generatedText,
      usedKeywords: selectedTargetKeywords
    });
  } catch (error) {
    console.error("Error generating review:", error);

    // If request was aborted due to timeout, return a clear error
    if (error.name === "AbortError" || error.message?.includes("abort")) {
      return res.status(504).json({
        message: "AI API timed out. Please try again.",
        error: "timeout",
      });
    }

    const fallbackKeys = targetKeywordsStr || customerAnswersStr || "services";
    const bName = businessName || "this place";
    const hindiKeys = translateKeywordsToHindi(fallbackKeys);

    const fallbackMap = {
      hindi: `${bName} का काम सच में सराहनीय है। ${hindiKeys} के मामले में इनकी सेवा अच्छी थी और स्टाफ का व्यवहार मददगार रहा।`,
      hinglish: `${bName} mein experience bahut accha raha. ${fallbackKeys ? fallbackKeys + ' ke liye' : ''} inki service badhiya thi aur staff bhi supportive tha.`,
      english: `Really pleased with my experience at ${bName}. ${targetKeywordsStr ? `Regarding ${targetKeywordsStr}, ` : ''}the service was smooth and the team was genuinely helpful.`
    };
    res.json({ 
      generatedReview: fallbackMap[language] || fallbackMap.english,
      usedKeywords: selectedTargetKeywords
    });
  }
};