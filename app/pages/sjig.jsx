import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const text = [
	{
		title: "At a Glance",
		$id: 1,
		body: `DRMC IT CLUB is excited to announce the launch of "Sheikh Jamal Innovation Grant" a tribute honoring the legacy of Sheikh Jamal, the distinguished son of Bangabandhu Sheikh Mujibur Rahman. This initiative aims to serve as a catalyst, inspiring a new generation of entrepreneurs in Bangladesh.\n\nWith a primary focus on providing a platform for startups and entrepreneurs to showcase their innovative ideas, this meticulously crafted event is designed to foster creativity and collaboration. Participants will have unique opportunities to secure financial assistance and turn their visionary concepts into tangible realities. Commemorating Sheikh Jamal's legacy, the initiative strives to motivate a fresh wave of innovators, significantly contributing to the growth of the entrepreneurial ecosystem in Bangladesh.\n\nThe Sheikh Jamal Innovation Grant, hosted by DRMC IT CLUB, serves as a catalyst for positive change, reflecting Sheikh Jamal's commitment to innovation and progress. Entrepreneurs showcase groundbreaking ideas, network, receive feedback, and have the chance to secure financial support. This event highlights DRMC IT CLUB's dedication to nurturing talent and fostering innovation in Bangladesh's startup ecosystem.`,
	},
	{
		title: "Prizepool",
		$id: 2,
		body: `Exciting rewards await the top innovators! With a total prize pool of 20,00,000 BDT, the champion will take home 5,00,000 BDT. Runners-up, second runners-up, and 4th to 13th startups each receive their share of the rewards as mentioned below.\n\nPrize Pool Distribution:\nChampion- 5,00,000 BDT\nRunners Up- 3,00,000 BDT\nSecond Runners Up- 2,00,000 BDT\n4th-13th Startups- 1,00,000 BDT Each\nTotal	Prizepool- 20,00,000 BDT
	`,
	},
	{
		title: "OBJECTIVE",
		$id: 3,
		body: `DRMC IT CLUB endeavors to empower entrepreneurs and startups, inspiring them to dream ambitiously and take decisive steps towards achieving their goals. The objective is to foster a startup-friendly environment, aligning with the visionary aspirations of Sheikh Jamal, the son of Bangabandhu Sheikh Mujibur Rahman, for a smart and prosperous Bangladesh.`,
	},
	{
		title: "ROADMAP",
		$id: 4,
		body: `From idea submission to the Gala Event, the Sheikh Jamal Innovation Grant roadmap is a concise journey. Participants submit ideas, undergo promotion, engage in dynamic pitching, face meticulous judging, and culminate in the Gala Event where the top startup claims the coveted grant. This straightforward path mirrors the essence of innovation, echoing Sheikh Jamal's legacy in the entrepreneurial landscape. `,
	},
	{
		title: "WHO CAN APPLY? ",
		$id: 5,
		body: `DRMC IT CLUB invites innovative submissions from Bangladeshi citizens with distinctive ideas, products, or services. This is an opportunity to showcase your creativity and contribute to the growth of the IT industry in Bangladesh. Join us in fostering a culture of innovation and entrepreneurship – submit your application and be a part of shaping the future of technology in our country.`,
	},
	{
		title: "Selection Process and Steps ",
		$id: 6,
		body: ` The first step in the competition is to use the SHEIKH JAMAL INNOVATION GRANT website to submit an application by the deadline of 11 April. Following the screening of applications, the selected applicants will participate in a pitching session in the second round. The judges will assess the initiative based on a variety of factors, including its creativity, viability, impact, business potential, team, consumer demands, and market demand. After being chosen, the entrepreneurs will take part in boot camp from 12 to 24 April, where they will get coaching and guidance in order to get ready for the last pitching session. The final judging and gala event will take place from 25 to 27 April, where the top 13 startups, one of which will win the SHEIKH JAMAL INNOVATION GRANT prize, will be selected by the knowledgeable panel of judges.\n\nSubmission Starts > Submission Ends > Primary Selection > Online Pitching Session > Secondary Selection > Bootcamp with Top 25 Startups > Top 13 Startups Selection > Final Pitching > Winners announcement for Sheikh Jamal Innovation Grant`,
	},
	{
		title: "TERMS AND CONDITIONS ",
		$id: 7,
		body: `1. The applicant must be a startup or entrepreneur with an ICT-based product or service at the prototype level or above.\n\n2. The proposed innovation must demonstrate creativity and have a positive impact on social change, economic development, and the environment.\n\n3. Applicants must be legally established entities and must not have a history of involvement in criminal or illegal activities.\n\n4. Applications will only be accepted online via the official website of the Sheikh Jamal Innovation Grant.\n\n 5.Previous winners of similar grants may have restrictions on reapplication, as detailed in the contest guidelines.\n\n6. Startups funded by IDEA are ineligible to participate in this grant.\n\n7. Go to sjig.drmcitclub.com/apply to submit your application.\n\n7. Applicants must carefully review the contest rules and guidelines before proceeding with the application process.\n\n8. Ensure all required documents, including pitch decks and business plans, are prepared before initiating the application.\n\n9. Provide accurate and comprehensive details about your startup, using clear and understandable language.\n\n10. Follow the specified formatting and submission guidelines outlined by the contest organizers.\n\n11. Review your application for completeness and accuracy before submission, and retain a copy for your records.\n\n12. Stay vigilant for updates or requests for additional information from the contest organizers via email.13. Submit your application before the specified deadline and adhere to all subsequent contest timelines and requirements.\n\n14. The prize pool distribution and total amount in competitions may be subject to change at the discretion of the organizing authority, DRMC IT Club and iDEA, with their decision being final.\n\n15. The authority's decisions are final, and any changes or updates will be communicated promptly.`,
	},
	{
		title: "PITCH DECK GUIDELINE",
		$id: 8,
		body: `
1. Make sure the pitch deck is short and focused, with only 10-12 slides.\n
2. Begin with a short and easy-to-understand introduction that grabs people's interest and clearly describes what your new business does and why it's significant.\n
3. Explain and give a brief description of the market opportunity, size, and problem that your startup is trying to fix.\n
4. Explain what makes you special and better than others, and how you will stand out from your competition.\n
5. Clearly explain how your business will make money and where the money will come from. This should include how you will set your prices.\n
6. Show that people like your product by getting feedback from customers, doing trial runs, or showing how many people are buying it early on.\n
7. Please tell us how you plan to sell your product, who you want to sell it to, and how you will advertise and make sales.\n
8. Talk about your plan for your product or service and how you will make it better in the future.\n
9. Please describe the technology structure briefly.\n
10. Explain how much money you think you will make and how much it will cost to run your business. Also, talk about any money you have already gotten and how you plan to get more money in the future.\n
11. Identify any partnerships or working together with others that could help you grow faster or reach more.\n
12. Explain any possible problems or difficulties your new business might have and how you will deal with them.\n
13. Display any progress your startup has already made, like gaining customers, getting attention from the media, or hiring important staff members.\n
14. Tell us about your team's experience and skills, and show how your team is a good fit to make your startup's ideas happen.\n
15. Use pictures like charts or drawings to show important information.\n
`,
	},
];

const sjig = () => {
	return (
		<View className>
			<Stack.Screen
				options={{
					title: "Sheikh Jamal Innovation Grant",
					headerStyle: { backgroundColor: "#12171F" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<SafeAreaView className="bg-primary h-full px-8">
				<FlatList
					data={text}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => (
						<View className="mb-5">
							<Text className="text-white text-lg font-sfBold uppercase mb-3">
								{item.title}
							</Text>
							<Text className="text-gray-500 text-sm font-sftMedium leading-5">
								{item.body}
							</Text>
						</View>
					)}
					ListHeaderComponent={() => (
						<View className="h-[120px] mb-6">
							<Image
								className="h-[120px] w-auto"
								source={{
									uri: "https://cloud.appwrite.io/v1/storage/buckets/6696751b002a0827d855/files/669786340028420fb533/view?project=6690ac320023fc19ec92&mode=admin",
								}}
								resizeMode="contain"
							/>
						</View>
					)}
					ListFooterComponent={() => (
						<View className="mb-12">
							<CustomButton
								title="Apply Now"
								handlePress={() => {
									console.log("Clicked apply now");
								}}
							/>
						</View>
					)}
				></FlatList>
			</SafeAreaView>
		</View>
	);
};

export default sjig;
