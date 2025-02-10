import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// icons
import { Mail, Linkedin } from 'lucide-react';
// Helmet
import { Helmet } from 'react-helmet-async';
// MUI
import { Container, Grid } from '@mui/material';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';

const ContactUs = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Helmet>
				<title>Contact Us | Reach Out to the Taxspoc Team</title>
				<meta
					name="description"
					content="Have questions or ideas for collaboration? Contact Taxspoc for inquiries about articles, advertising, or support. We’re ready to connect."
				/>
				<link rel="canonical" href="https://www.taxspoc.com/contact" />
				{/* og */}
				<meta property="og:title" content="Contact Us | Get in Touch with Taxspoc" />
				<meta
					property="og:description"
					content="Reach out to the Taxspoc team for questions, advertising opportunities, or general support."
				/>
				<meta property="og:url" content="https://www.taxspoc.com/contact" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://www.taxspoc.com/logo-dark.png" />
				{/* twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Contact Us | Get in Touch with Taxspoc" />
				<meta
					name="twitter:description"
					content="LReach out to the Taxspoc team for questions, advertising opportunities, or general support."
				/>
			</Helmet>
			<MainBar />
			<div className="max-w-6xl mx-auto mt-12 px-4">
				<h1 className="text-4xl font-bold text-primary mb-4">CONTACT US</h1>
				<h2 className="text-2xl font-semibold text-primary mb-3">We’d Love to Hear from You!</h2>
				<p className="text-base text-gray-700">
					Whether you have questions about our articles, collaborations, advertising opportunities,
					or just want to share feedback — our team is here to help.
				</p>

				{/* Reach Us Directly */}
				<div className="mt-8">
					<h2 className="text-2xl font-semibold text-primary mb-3">REACH US DIRECTLY</h2>

					{/* Email */}
					<div className="flex items-center space-x-2 text-gray-700">
						<Mail className="w-5 h-5 text-primary" />
						<span className="font-medium">By Email:</span>
						<a href="mailto:hello@taxspoc.com" className="text-sky-600 hover:underline">
							hello@taxspoc.com
						</a>
					</div>

					{/* LinkedIn */}
					<div className="flex items-center space-x-2 text-gray-700 mt-2">
						<Linkedin className="w-5 h-5 text-primary" />
						<span className="font-medium">Connect with Us on LinkedIn:</span>
						<a
							href="https://www.linkedin.com/company/taxspoc"
							className="text-blue-600 hover:underline"
						>
							TAXSPOC LinkedIn page
						</a>
					</div>
				</div>

				{/* Common Inquiries */}
				<div className="mt-8">
					<h2 className="text-2xl font-semibold text-primary mb-3">COMMON INQUIRIES</h2>

					{/* Collaboration */}
					<h3 className="text-xl font-bold text-primary mt-4">
						Collaboration & Sponsored Articles
					</h3>
					<p className="text-base text-gray-700">
						Interested in collaborating with us or contributing articles? We’re always open to
						discussing new partnerships. Reach out for more details.
					</p>

					{/* Advertising */}
					<h3 className="text-xl font-bold text-primary mt-4">Advertising Opportunities</h3>
					<p className="text-base text-gray-700">
						Looking to advertise on our platform? Let’s discuss options that align with your
						business goals.
					</p>

					{/* General Questions */}
					<h3 className="text-xl font-bold text-primary mt-4">General Questions</h3>
					<p className="text-base text-gray-700">
						If you’re unsure who to contact or have a general question, feel free to drop us an
						email, and we’ll get back to you as soon as possible.
					</p>
				</div>

				{/* Closing */}
				<div className="mt-8 text-base text-gray-700 font-medium">
					We’re excited to hear from you and will do our best to respond promptly!
				</div>
			</div>

			<BottomContainer />
		</>
	);
};

export default ContactUs;
