import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
			{/* <Container sx={{ marginTop: '16px' }}>
				<Grid container item rowSpacing={2} xs={12} sm={12} md={8} lg={8} xl={8}> */}
			<div className="mt-12 max-w-6xl mx-auto px-4">
				{/* <div className="container"> */}
				<h1 className="text-4xl font-bold text-primary mt-4 mb-4 uppercase">CONTACT US</h1>

				<div className="mt-8">
					<h2 className="text-2xl font-bold text-primary mt-3 mb-3">We’d Love to Hear from You!</h2>
					<div>
						Whether you have questions about our articles, collaborations, advertising
						opportunities, or just want to share feedback—our team is here to help.
					</div>
				</div>

				<div className="mt-8">
					<h2 className="text-2xl font-bold text-primary mt-3 mb-3">Reach Us Directly:</h2>
					<div>
						<span className="font-bold">Email:</span>{' '}
						<a
							className="text-sky-600 underline hover:text-sky-900"
							href="mailto:hello@taxspoc.com"
						>
							hello@taxspoc.com
						</a>
					</div>
					<div>
						<span className="font-bold">Connect with Us on LinkedIn:</span> Stay updated and reach
						out via our official{' '}
						<a
							className="text-sky-600 underline hover:text-sky-900"
							href="https://www.linkedin.com/company/taxspoc"
						>
							Taxspoc LinkedIn page
						</a>
					</div>
				</div>

				<div className="mt-8">
					<h2 className="text-2xl font-bold text-primary mt-3 mb-3">Common Inquiries:</h2>
					<h3 className="text-xl font-bold text-primary mt-2 mb-2">
						Collaboration & Sponsored Articles
					</h3>
					<div>
						Interested in collaborating with us or contributing articles? We’re always open to
						discussing new partnerships. Reach out for more details.
					</div>
					<h3 className="text-xl font-bold text-primary mt-2 mb-2">Advertising Opportunities</h3>
					<div>
						Looking to advertise on our platform? Let’s discuss options that align with your
						business goals.
					</div>
					<h3 className="text-xl font-bold text-primary mt-2 mb-2">General Questions</h3>
					<div>
						If you’re unsure who to contact or have a general question, feel free to drop us an
						email, and we’ll get back to you as soon as possible.
					</div>
				</div>

				<div className="mt-12">
					We’re excited to hear from you and will do our best to respond promptly!
				</div>
				{/* </div> */}
			</div>

			{/* </Grid>
			</Container> */}

			<BottomContainer />
		</>
	);
};

export default ContactUs;
