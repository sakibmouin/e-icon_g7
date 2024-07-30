export const courses = {
	"course-1": {
		id: "course-1",
		name: "Early Stage",
		aboutCourse:
			"Discover how to launch and grow your startup with a focus on sustainability and inclusive economic growth. This course will guide you through essential strategies to build a successful business aligned with Sustainable Development Goal 8. Learn how to conduct market research, secure funding, develop eco-friendly products, and create a positive impact on your community. Perfect for aspiring entrepreneurs committed to making a difference while achieving business success. Join us to drive innovation and sustainability in your startup journey!",
		courseImage:
			"https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
		courseListImage:
			"https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/66a3d11e003b80ce3732/view?project=6690ac320023fc19ec92&mode=admin",
		duration: "4 Hours",
		benefits: [
			{ id: 1, title: "Sustainable Growth Techniques" },
			{ id: 2, title: "Market Research Skills" },
			{ id: 3, title: "Funding Insights" },
			{ id: 4, title: "Eco-friendly Practices" },
			{ id: 5, title: "Community Impact" },
		],
		modules: [
			{
				id: "module-1",
				title: "Introduction to Entrepreneurship",
				animation: require("../../assets/animations/anim3.json"),
				moduleInfo: "info",
				body: [
					{
						type: "lottie",
						content: require("../../assets/animations/anim3.json"),
					},
					{ type: "heading", content: "Why SDG 8 is Important" },
					{
						type: "paragraph",
						content:
							"SDG 8 aims to promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all.",
					},
					{
						type: "paragraph",
						content:
							"Economic growth should not come at the expense of the environment or social equity. SDG 8 focuses on ensuring economic growth benefits everyone, particularly the most vulnerable.",
					},
					{
						type: "paragraph",
						content:
							"This lesson will explore the key targets and indicators of SDG 8, and how businesses can contribute to achieving these goals.",
					},
					{ type: "image", content: require("../../assets/icon.png") },
					{ type: "shortTextInput", content: "<title>" },
					{ type: "longTextInput", content: "<title>" },
				],
			},
		],
	},
};
