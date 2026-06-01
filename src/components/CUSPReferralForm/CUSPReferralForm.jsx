import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { buildReferralEmailPayload, referralCollections, saveReferralSubmission } from '../../lib/referralSubmissions';
import './CUSPReferralForm.css';

const initialForm = {
  // Section 1
  referrerType: '',
  referrerRelation: '',
  referrerContact: '',
  // Section 2
  firstName: '',
  surname: '',
  dob: '',
  // Section 3
  sex: '',
  isTrans: '',
  genderDesc: '',
  // Section 4
  accessibility: '',
  medical: '',
  // Section 5
  address: '',
  phone: '',
  email: '',
  occupation: '',
  // Section 6
  gpName: '',
  gpAddress: '',
  gpPhone: '',
  // Section 7
  emergencyName: '',
  emergencyRelation: '',
  emergencyPhone: '',
  // Section 8
  referralReason: '',
  referralWorries: '',
  // Section 9
  activityTypes: [],
  activityAccess: '',
  activityFrequency: [],
  activityTimes: [],
  consentInfo: false,
  consentStore: false,
  signature: '',
  dateSigned: '',
};

const ReferralForm = ({ onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [touched, setTouched] = useState({});


  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;
    // Handle checkboxes for multi-select fields
    if (name === 'activityTypes' || name === 'activityFrequency' || name === 'activityTimes') {
      let updated = [...form[name]];
      if (checked) {
        updated.push(value);
      } else {
        updated = updated.filter((v) => v !== value);
      }
      setForm({ ...form, [name]: updated });
    } else {
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    const errors = {};
    // Section 1
    if (!form.referrerType) errors.referrerType = 'Required';
    if (form.referrerType === 'someone') {
      if (!form.referrerRelation) errors.referrerRelation = 'Required';
      if (!form.referrerContact) errors.referrerContact = 'Required';
    }
    // Section 2
    if (!form.firstName) errors.firstName = 'Required';
    if (!form.surname) errors.surname = 'Required';
    if (!form.dob) errors.dob = 'Required';
    // Section 3
    if (!form.sex) errors.sex = 'Required';
    // Section 4
    // Section 5
    if (!form.address) errors.address = 'Required';
    if (!form.phone) errors.phone = 'Required';
    if (!form.email) errors.email = 'Required';
    // Section 6
    if (!form.gpName) errors.gpName = 'Required';
    if (!form.gpAddress) errors.gpAddress = 'Required';
    if (!form.gpPhone) errors.gpPhone = 'Required';
    // Section 7
    if (!form.emergencyName) errors.emergencyName = 'Required';
    if (!form.emergencyRelation) errors.emergencyRelation = 'Required';
    if (!form.emergencyPhone) errors.emergencyPhone = 'Required';
    // Section 8
    if (!form.referralReason) errors.referralReason = 'Required';
    if (!form.referralWorries) errors.referralWorries = 'Required';
    // Section 9
    // Section 10
    if (!form.consentInfo) errors.consentInfo = 'Required';
    if (!form.consentStore) errors.consentStore = 'Required';
    if (!form.signature) errors.signature = 'Required';
    if (!form.dateSigned) errors.dateSigned = 'Required';
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.keys(initialForm).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    if (!isValid) return;
    setSending(true);
    setFeedback('');
    let savedToFirestore = false;
    try {
      const emailPayload = buildReferralEmailPayload({ referralLabel: 'CUSP', form });

      await saveReferralSubmission({
        collectionName: referralCollections.CUSP,
        referralLabel: 'CUSP',
        form,
      });
      savedToFirestore = true;

      await emailjs.send(
        'service_z4gztrd',
        'template_xyndtc9',
        emailPayload,
        '7KUqYQDRMLAewrq1b'
      );

      setFeedback('Referral  sent.');
      setForm(initialForm);
    } catch (error) {
      setFeedback(
        savedToFirestore
          ? 'Referral email could not be sent.'
          : 'Failed to save referral. Please try again.'
      );
      if (savedToFirestore) {
        setForm(initialForm);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{maxHeight: '90vh', overflowY: 'auto'}}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>CUSP Referral Form</h2>
        <p><em>All questions with an <b>*asterisk*</b> are mandatory</em></p>
        <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
          {/* Section 1 */}
          <h3>Section 1: Self/referral</h3>
          <label>
            1.a Who is filling in this form*:
            <select name="referrerType" value={form.referrerType} onChange={handleChange} onBlur={handleBlur} required>
              <option value="">Select...</option>
              <option value="myself">myself</option>
              <option value="someone">someone on my behalf</option>
            </select>
            {touched.referrerType && errors.referrerType && <span className="form-error">{errors.referrerType}</span>}
          </label>
          {form.referrerType === 'someone' && (
            <>
              <label>
                1.b Relation to participant*
                <select name="referrerRelation" value={form.referrerRelation} onChange={handleChange} onBlur={handleBlur} required>
                  <option value="">Select...</option>
                  <option value="GP">GP</option>
                  <option value="Social/support worker">Social/support worker</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Partner">Partner</option>
                  <option value="Friend">Friend</option>
                  <option value="Carer">Carer</option>
                  <option value="Other">Other</option>
                </select>
                {touched.referrerRelation && errors.referrerRelation && <span className="form-error">{errors.referrerRelation}</span>}
              </label>
              <label>
                1.c Contact details of person filling in form on my behalf (name, job title, email and phone number helpful):
                <textarea name="referrerContact" value={form.referrerContact} onChange={handleChange} onBlur={handleBlur} required />
                {touched.referrerContact && errors.referrerContact && <span className="form-error">{errors.referrerContact}</span>}
              </label>
            </>
          )}

          {/* Section 2 */}
          <h3>Section 2: Participant Information</h3>
          <label>
            2. First Name*
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur} required />
            {touched.firstName && errors.firstName && <span className="form-error">{errors.firstName}</span>}
          </label>
          <label>
            3. Surname*
            <input type="text" name="surname" value={form.surname} onChange={handleChange} onBlur={handleBlur} required />
            {touched.surname && errors.surname && <span className="form-error">{errors.surname}</span>}
          </label>
          <label>
            4. Date of Birth*
            <input type="date" name="dob" value={form.dob} onChange={handleChange} onBlur={handleBlur} required />
            {touched.dob && errors.dob && <span className="form-error">{errors.dob}</span>}
          </label>

          {/* Section 3 */}
          <h3>Section 3: Sex & Gender Information</h3>
          <label>
            5. What is your Sex*?
            <select name="sex" value={form.sex} onChange={handleChange} onBlur={handleBlur} required>
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {touched.sex && errors.sex && <span className="form-error">{errors.sex}</span>}
          </label>
          <label>
            6. (Optional) Are you trans or do you have a trans-history?
            <select name="isTrans" value={form.isTrans} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
          <label>
            7. (Optional) Please specify how you would describe your gender?
            <input type="text" name="genderDesc" value={form.genderDesc} onChange={handleChange} onBlur={handleBlur} />
          </label>

          {/* Section 4 */}
          <h3>Section 4: Health & Accessibility</h3>
          <p className="form-note">The following helps us plan a session with you – you can always give us more information over the phone or at your taster session.</p>
          <label>
            8. (Optional) Do you have any disabilities, learning difficulties, ADHD, visual impairments, or accessibility needs we should be aware of?
            <textarea name="accessibility" value={form.accessibility} onChange={handleChange} onBlur={handleBlur} required />
            {touched.accessibility && errors.accessibility && <span className="form-error">{errors.accessibility}</span>}
          </label>
          <label>
            9. (Optional) Do you have any medical conditions, allergies, medications, or medical aids we should know about?
            <textarea name="medical" value={form.medical} onChange={handleChange} onBlur={handleBlur} required />
            {touched.medical && errors.medical && <span className="form-error">{errors.medical}</span>}
          </label>

          {/* Section 5 */}
          <h3>Section 5: Contact Information</h3>
          <label>
            10. Address*
            <textarea name="address" value={form.address} onChange={handleChange} onBlur={handleBlur} required />
            {touched.address && errors.address && <span className="form-error">{errors.address}</span>}
          </label>
          <label>
            11. Telephone Number*
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} required />
            {touched.phone && errors.phone && <span className="form-error">{errors.phone}</span>}
          </label>
          <label>
            12. Email Address* (if you do not have an email state ‘no@email’)
            <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} required />
            {touched.email && errors.email && <span className="form-error">{errors.email}</span>}
          </label>
          <label>
            13. (Optional) Occupation
            <input type="text" name="occupation" value={form.occupation} onChange={handleChange} onBlur={handleBlur} />
          </label>

          {/* Section 6 */}
          <h3>Section 6: GP / Medical Contact</h3>
          <label>
            14. GP Name*
            <input type="text" name="gpName" value={form.gpName} onChange={handleChange} onBlur={handleBlur} required />
            {touched.gpName && errors.gpName && <span className="form-error">{errors.gpName}</span>}
          </label>
          <label>
            15. GP Address*
            <textarea name="gpAddress" value={form.gpAddress} onChange={handleChange} onBlur={handleBlur} required />
            {touched.gpAddress && errors.gpAddress && <span className="form-error">{errors.gpAddress}</span>}
          </label>
          <label>
            16. GP Contact Number*
            <input type="tel" name="gpPhone" value={form.gpPhone} onChange={handleChange} onBlur={handleBlur} required />
            {touched.gpPhone && errors.gpPhone && <span className="form-error">{errors.gpPhone}</span>}
          </label>

          {/* Section 7 */}
          <h3>Section 7: Emergency Contact</h3>
          <label>
            17. Emergency Contact Name*
            <input type="text" name="emergencyName" value={form.emergencyName} onChange={handleChange} onBlur={handleBlur} required />
            {touched.emergencyName && errors.emergencyName && <span className="form-error">{errors.emergencyName}</span>}
          </label>
          <label>
            18. Emergency Contact Relationship*
            <select name="emergencyRelation" value={form.emergencyRelation} onChange={handleChange} onBlur={handleBlur} required>
              <option value="">Select...</option>
              <option value="Parent">Parent</option>
              <option value="Partner">Partner</option>
              <option value="Sibling">Sibling</option>
              <option value="Relative">Relative</option>
              <option value="Friend">Friend</option>
              <option value="Carer">Carer</option>
              <option value="Other">Other</option>
            </select>
            {touched.emergencyRelation && errors.emergencyRelation && <span className="form-error">{errors.emergencyRelation}</span>}
          </label>
          <label>
            19. Emergency Contact Phone Number*
            <input type="tel" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} onBlur={handleBlur} required />
            {touched.emergencyPhone && errors.emergencyPhone && <span className="form-error">{errors.emergencyPhone}</span>}
          </label>

          {/* Section 8 */}
          <h3>Section 8: Referral / Support Needs</h3>
          <label>
            20. What current or past issue(s) or concern(s) have led you to seek outdoor counselling or group work with CUSP? What are you seeking to get out these sessions?*
            <textarea name="referralReason" value={form.referralReason} onChange={handleChange} onBlur={handleBlur} required />
            {touched.referralReason && errors.referralReason && <span className="form-error">{errors.referralReason}</span>}
          </label>
          <label>
            21. Is there anything you’re worried about regarding participating in our individual or group programmes ? *
            <textarea name="referralWorries" value={form.referralWorries} onChange={handleChange} onBlur={handleBlur} required />
            {touched.referralWorries && errors.referralWorries && <span className="form-error">{errors.referralWorries}</span>}
          </label>

          {/* Section 9 */}
          <h3>Section 9: Type of activity/support you’re interested in</h3>
          <div className="form-section">
            <label>
              22. Please tick as many or as few of the options below that appeal to you:<br/>
              <span style={{fontSize: '0.95em'}}>(Note those marked with <b>#</b> incur additional costs)</span>
              <div className="checkbox-group">
                {[
                  { label: 'Walk & Talk (Urban/greenspace based)', value: 'Walk & Talk (Urban/greenspace based)' },
                  { label: 'Walk & Talk (Rural/more remote)#', value: 'Walk & Talk (Rural/more remote)#' },
                  { label: 'Cycling (own bike)', value: 'Cycling (own bike)' },
                  { label: 'Cycling (incl. bike hire)#', value: 'Cycling (incl. bike hire)#' },
                  { label: 'Mountain biking/trials#', value: 'Mountain biking/trials#' },
                  { label: 'Canoeing#', value: 'Canoeing#' },
                  { label: 'Mountain/hill climb#', value: 'Mountain/hill climb#' },
                  { label: 'Outdoor Swimming', value: 'Outdoor Swimming' },
                  { label: 'Beach walk/combing#', value: 'Beach walk/combing#' },
                ].map(opt => (
                  <label key={opt.value} className="checkbox-label" style={{display: 'block'}}>
                    <input
                      type="checkbox"
                      name="activityTypes"
                      value={opt.value}
                      checked={form.activityTypes.includes(opt.value)}
                      onChange={handleChange}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {touched.activityTypes && errors.activityTypes && <span className="form-error">{errors.activityTypes}</span>}
            </label>
            <label>
              23. How would you prefer to access these activities:
              <select
                name="activityAccess"
                value={form.activityAccess}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select...</option>
                <option value="Individual">Individual</option>
                <option value="Group">Group</option>
                <option value="Both">Both</option>
              </select>
              {touched.activityAccess && errors.activityAccess && <span className="form-error">{errors.activityAccess}</span>}
            </label>
            <label>
              24. Tell us how often and for how long you’d be interested in accessing these activities:
              <div className="checkbox-group">
                {[
                  'Weekly', 'Fortnightly', 'Monthly', 'One-off',
                  '1 hour', '2 hour', 'Half day', 'Full day',
                  'Multi-days/without overnights', 'Multi-days/with overnights'
                ].map(opt => (
                  <label key={opt} className="checkbox-label" style={{display: 'block'}}>
                    <input
                      type="checkbox"
                      name="activityFrequency"
                      value={opt}
                      checked={form.activityFrequency.includes(opt)}
                      onChange={handleChange}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {touched.activityFrequency && errors.activityFrequency && <span className="form-error">{errors.activityFrequency}</span>}
            </label>
            <label>
              25. Tell us when are the best times and days for you most weeks:
              <div className="checkbox-group" style={{columnCount: 2}}>
                {[
                  'Monday Morning', 'Monday Afternoon', 'Monday Evening',
                  'Tuesday Morning', 'Tuesday Afternoon', 'Tuesday Evening',
                  'Wednesday Morning', 'Wednesday Afternoon', 'Wednesday Evening',
                  'Thursday Morning', 'Thursday Afternoon', 'Thursday Evening',
                  'Friday Morning', 'Friday Afternoon', 'Friday Evening',
                  'Saturday Morning', 'Saturday Afternoon', 'Saturday Evening',
                  'Sunday Morning', 'Sunday Afternoon', 'Sunday Evening',
                ].map(opt => (
                  <label key={opt} className="checkbox-label" style={{display: 'block'}}>
                    <input
                      type="checkbox"
                      name="activityTimes"
                      value={opt}
                      checked={form.activityTimes.includes(opt)}
                      onChange={handleChange}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {touched.activityTimes && errors.activityTimes && <span className="form-error">{errors.activityTimes}</span>}
            </label>
          </div>

          {/* Section 10 */}
          <h3>Section 10: Consent & Signature</h3>
          <label className="checkbox-label">
            22a. I confirm that the information provided is accurate to the best of my knowledge*
            <input type="checkbox" name="consentInfo" checked={form.consentInfo} onChange={handleChange} />
            {touched.consentInfo && errors.consentInfo && <span className="form-error">{errors.consentInfo}</span>}
          </label>
          <div className="form-note" style={{marginBottom: '0.5rem'}}>
            <b>Privacy Notice</b><br />
            All information you have provided on this form is stored securely and password protected with 2-step authentication using an additional device. We use industry standard encrypted cloud-based software to store forms. Nothing is printed. Nothing is shared out with CUSP without your full consent.<br />
            All CUSP staff and Volunteers are members of PVG and adhere to CUSP’s ethical code of practice which includes a confidentiality agreement with all participants/clients. Lead practitioners are members of professional governing bodies (details available on request) membership of which requires adherence to a full code of professional ethics.
          </div>
          <label className="checkbox-label">
            22b. I give CUSP full consent to store the information I have provided on this form*
            <input type="checkbox" name="consentStore" checked={form.consentStore} onChange={handleChange} />
            {touched.consentStore && errors.consentStore && <span className="form-error">{errors.consentStore}</span>}
          </label>
          <label>
            23. Full Name (Digital Signature/type)*
            <input type="text" name="signature" value={form.signature} onChange={handleChange} onBlur={handleBlur} required />
            {touched.signature && errors.signature && <span className="form-error">{errors.signature}</span>}
          </label>
          <label>
            24. Date Signed*
            <input type="date" name="dateSigned" value={form.dateSigned} onChange={handleChange} onBlur={handleBlur} required />
            {touched.dateSigned && errors.dateSigned && <span className="form-error">{errors.dateSigned}</span>}
          </label>

          <button type="submit" disabled={sending || !isValid}>{sending ? 'Submitting...' : 'Submit'}</button>
          {feedback && <div className="form-feedback">{feedback}</div>}
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;
