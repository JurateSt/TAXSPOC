import React, { useEffect, useState } from 'react';
// TinyMCE
import { Editor } from '@tinymce/tinymce-react';

const EditorTinyMCE = ({ value, onChange }) => {
	return (
		<Editor
			apiKey="rk2aip84g35omv0hc2cscaxth7rtdo001kbuxl6ndao4f68b"
			init={{
				paste_as_text: true,
				plugins:
					'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
				// 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
				toolbar:
					'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | checklist numlist bullist indent outdent | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight  | emoticons charmap | removeformat',
				tinycomments_mode: 'embedded',
				tinycomments_author: 'Author name',
				mergetags_list: [
					{ value: 'First.Name', title: 'First Name' },
					{ value: 'Email', title: 'Email' },
				],
				ai_request: (request, respondWith) =>
					respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
			}}
			// initialValue={initialValue}
			value={value}
			onEditorChange={onChange}
		/>
	);
};

export default EditorTinyMCE;
