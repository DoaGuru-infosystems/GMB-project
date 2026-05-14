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
  const { clientId, dateRange, startDate, endDate, page = 1, limit = 10 } = req.query;
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

exports.generateReview = async (req, res) => {
  const { keywords, businessName } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    // Fallback if no OpenAI key is configured
    const keysStr = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'great service');
    const bName = businessName || 'this place';
    return res.json({
      generatedReview: `I had a wonderful experience at ${bName}. The ${keysStr} was absolutely fantastic. Highly recommend them to anyone looking for excellent quality and care!`
    });
  }

  const keysStr = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'services');
  const prompt = `Act as an extremely satisfied customer writing a 5-star Google review for a business named "${businessName || 'this company'}". 
  
Include these specific aspects or services they provided: ${keysStr}.

Rules:
1. Make it sound 100% human, casual, and authentic. DO NOT sound like an AI robot or overly formal.
2. Use natural, engaging, and positive language that sounds authentic and human. Include modern conversational phrases such as "amazing experience", "super smooth process", "highly recommended", "professional team", "great communication", and "outstanding support" etc.
3. Keep it concise and short, around 3 to 4 lines maximum. DO NOT write a long paragraph.
4. Do NOT use hashtags.
5. Sometimes start sentences with lowercase or use casual punctuation (like !).
6. Mention the business name "${businessName || 'the company'}" in the review naturally.
7. CRITICAL: ABSOLUTELY DO NOT use ANY negative words like "can't", "cannot", "wouldn't", "couldn't", "don't", "won't", "not", "never", "no". Even if you are trying to be positive (like "I can't thank them enough" or "wouldn't go anywhere else"), you MUST NOT use these words. Only use purely positive phrasing.
8. DO NOT use the word "top-notch" or "top notch". It is repetitive. Use words like excellent, outstanding, or fantastic instead.

Example style: "just wanted to give a shoutout to ${businessName || 'this business'} for their amazing work! The whole process was super smooth. Highly recommend!"`;

  const apiKey = process.env.OPENAI_API_KEY;
  const isCustomKey = apiKey && apiKey.startsWith('sk-or-');
  const apiUrl = isCustomKey
    ? 'https://openrouter.ai/api/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';
  const apiModel = isCustomKey ? "openai/gpt-3.5-turbo" : "gpt-3.5-turbo";

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
        max_tokens: 100,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("AI API Error:", data);
      throw new Error(data.error?.message || "AI API Error");
    }

    const generatedText = data.choices[0].message.content.replace(/^"|"$/g, '').trim();
    res.json({ generatedReview: generatedText });

  } catch (error) {
    console.error("Error generating review:", error);
    // Provide a fallback in case of API failure
    const fallbackKeys = Array.isArray(keywords) ? keywords.join(', ') : (keywords || 'great service');
    const bName = businessName || 'this place';
    res.json({
      generatedReview: `I had a wonderful experience at ${bName}. The ${fallbackKeys} was absolutely fantastic. Highly recommend them to anyone looking for excellent quality and care!`
    });
  }
};