export default QuizData = [
	{
		question: "Do you have a fully developed product or service?",
		options: [
			"No, just an idea",
			"Partially developed prototype",
			"Yes, but still refining",
			"Yes, fully developed and in the market",
		],
		category: "product",
		weight: 2,
		scores: [0, 1, 2, 3],
	},
	{
		question: "How many paying customers do you have?",
		options: ["None", "1-10", "11-100", "Over 100"],
		category: "traction",
		weight: 2,
		scores: [0, 1, 2, 3],
	},
	{
		question: "What's your current team size?",
		options: [
			"Just me or a co-founder",
			"2-5 employees",
			"6-20 employees",
			"More than 20 employees",
		],
		category: "team",
		weight: 1,
		scores: [0, 1, 2, 3],
	},
	{
		question: "Have you received any external funding?",
		options: [
			"No funding yet",
			"Friends and family or angel investors",
			"Seed round completed",
			"Series A or beyond",
		],
		category: "funding",
		weight: 2,
		scores: [0, 1, 2, 3],
	},
	{
		question: "What's your monthly revenue?",
		options: [
			"No revenue yet",
			"Less than $10,000",
			"$10,000 - $100,000",
			"Over $100,000",
		],
		category: "revenue",
		weight: 2,
		scores: [0, 1, 2, 3],
	},
];
