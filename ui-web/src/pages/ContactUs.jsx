import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// icons
import { Mail } from 'lucide-react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// Helmet
import { Helmet } from 'react-helmet-async';
// components
import MainBar from '../components/MainBar';
import BottomContainer from '../components/BottomBar/BottomContainer';

const ContactUs = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const jsonLdData = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Taxspoc',
		url: 'https://www.taxspoc.com',
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'hello@taxspoc.com',
			contactType: 'customer support',
		},
		sameAs: ['https://www.linkedin.com/company/taxspoc'],
	};
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
				<script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
			</Helmet>
			<MainBar />
			<div className="max-w-6xl mx-auto mt-12 px-4">
				<h1 className="text-primary">CONTACT US</h1>
				<h2 className="text-primary">We’d Love to Hear from You!</h2>
				<p>
					Whether you have questions about our articles, collaborations, advertising opportunities,
					or just want to share feedback — our team is here to help.
				</p>

				{/* Reach Us Directly */}
				<div className="mt-8">
					<h2 className="text-primary">REACH US DIRECTLY</h2>
					<div className="flex items-center space-x-2">
						<Mail className="w-5 h-5 text-primary mr-1" /> By Email:{' '}
						<a href="mailto:hello@taxspoc.com" className="text-sky-600  hover:text-sky-800">
							hello@taxspoc.com
						</a>
					</div>
					<div className="flex items-center space-x-2 mt-3">
						<LinkedInIcon className="w-5 h-5 text-primary" />
						Connect with Us on LinkedIn:{' '}
						<a
							href="https://www.linkedin.com/company/taxspoc"
							className="text-sky-600 hover:text-sky-800"
						>
							TAXSPOC LinkedIn page
						</a>
					</div>
				</div>

				{/* Common Inquiries */}
				<div className="mt-8">
					<h2 className="text-primary">COMMON INQUIRIES</h2>
					<div className="font-bold text-primary">Collaboration & Sponsored Articles</div>
					<p className="mt-0 mb-0">
						Interested in collaborating with us or contributing articles? We’re always open to
						discussing new partnerships. Reach out for more details.
					</p>

					<div className="font-bold text-primary mt-3">Advertising Opportunities</div>
					<p className="mt-0 mb-0">
						Looking to advertise on our platform? Let’s discuss options that align with your
						business goals.
					</p>

					<div className="font-bold text-primary mt-3">General Questions</div>
					<p className="mt-0 mb-0">
						If you’re unsure who to contact or have a general question, feel free to drop us an
						email, and we’ll get back to you as soon as possible.
					</p>
				</div>

				{/* Closing */}
				<div className="mt-12 text-primary">
					We’re excited to hear from you and will do our best to respond promptly!
				</div>
			</div>

			<BottomContainer />
		</>
	);
};

export default ContactUs;
