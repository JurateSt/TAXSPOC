// MUI
import { Typography, Grid } from '@mui/material';

const ContactUsContent = () => {
	return (
		// <Grid item xs={12}>
		<div className="container mx-auto">
			<p className="text-red-500 text-xl font-bold">Tailwind is working!</p>

			<h1 className="text-4xl font-bold text-primaryText my-4 mx-20 text-blue-500 ">CONTACT US</h1>

			<h2>
				<span style={{ color: '#404040' }}>We’d Love to Hear from You!</span>
			</h2>
			<div>
				Whether you have questions about our articles, collaborations, advertising opportunities, or
				just want to share feedback—our team is here to help.
			</div>
			<h2>
				<span style={{ color: '#404040' }}>Reach Us Directly:</span>
			</h2>
			<div>
				Email:{' '}
				<a style={{ color: '#404040' }} href="mailto:hello@taxspoc.com">
					hello@taxspoc.com
				</a>
			</div>
			<h2>
				<span style={{ color: '#404040' }}>Connect with Us on LinkedIn:</span>
			</h2>
			<div>
				Stay updated and reach out via our official{' '}
				<a style={{ color: '#404040' }} href="https://www.linkedin.com/company/taxspoc">
					Taxspoc
				</a>{' '}
				LinkedIn page
			</div>
			<h2>
				<span style={{ color: '#404040' }}>Common Inquiries:</span>
			</h2>
			<h3>Collaboration & Sponsored Articles</h3>
			<div>
				Interested in collaborating with us or contributing articles? We’re always open to
				discussing new partnerships. Reach out for more details.
			</div>
			<h3>Advertising Opportunities</h3>
			<div>
				Looking to advertise on our platform? Let’s discuss options that align with your business
				goals.
			</div>

			<h3>General Questions</h3>
			<div>
				If you’re unsure who to contact or have a general question, feel free to drop us an email,
				and we’ll get back to you as soon as possible.
			</div>

			<div>We’re excited to hear from you and will do our best to respond promptly!</div>
		</div>
		// </Grid>
	);
};

export default ContactUsContent;
