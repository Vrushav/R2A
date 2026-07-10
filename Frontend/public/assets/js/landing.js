const hospitals = {

"Village A":[
"Primary Health Centre",
"Community Health Centre"
],

"Village B":[
"Community Health Centre",
"District Hospital"
],

"Village C":[
"Primary Health Centre",
"District Hospital"
]

};

const hospitalInfo = {

"Primary Health Centre":{
    distance:5,
    waiting:8,
    doctors:3,
    departments:["General Medicine","Child Care","Dental"]
},

"Community Health Centre":{
    distance:12,
    waiting:4,
    doctors:6,
    departments:["General Medicine","Child Care","Dental","Eye Care"]
},

"District Hospital":{
    distance:25,
    waiting:2,
    doctors:18,
    departments:[
        "General Medicine",
        "Women's Health",
        "Child Care",
        "Dental",
        "Eye Care"
    ]
}

};

const medicineStock = {

"Primary Health Centre":[
{name:"Paracetamol",status:"🟢 Available"},
{name:"ORS",status:"🟢 Available"},
{name:"Iron Tablets",status:"🟢 Available"},
{name:"Insulin",status:"🟡 Low Stock"},
{name:"Rabies Vaccine",status:"🔴 Unavailable"}
],

"Community Health Centre":[
{name:"Paracetamol",status:"🟢 Available"},
{name:"ORS",status:"🟢 Available"},
{name:"Insulin",status:"🟢 Available"},
{name:"BP Medicine",status:"🟢 Available"},
{name:"Rabies Vaccine",status:"🟡 Limited"}
],

"District Hospital":[
{name:"Paracetamol",status:"🟢 Available"},
{name:"ORS",status:"🟢 Available"},
{name:"Insulin",status:"🟢 Available"},
{name:"Cancer Medicine",status:"🟢 Available"},
{name:"Rabies Vaccine",status:"🟢 Available"}
]

};

const healthCamps=[

{
id:1,
name:"👁 Free Eye Camp",
date:"15 July 2026",
location:"Village A PHC",
seats:20
},

{
id:2,
name:"💉 Vaccination Camp",
date:"18 July 2026",
location:"Village B CHC",
seats:30
},

{
id:3,
name:"🦷 Dental Camp",
date:"20 July 2026",
location:"Village C PHC",
seats:15
},

{
id:4,
name:"👩 Women's Health Camp",
date:"25 July 2026",
location:"District Hospital",
seats:25
}

];

function recommendHospital(village, department){

    let availableHospitals = hospitals[village];

    if(!availableHospitals){
        return null;
    }

    let bestHospital = null;

    let bestScore = -1;

    availableHospitals.forEach(function(hospital){

        let info = hospitalInfo[hospital];

        let score = 0;

        // Nearer hospital = higher score
        score += (30 - info.distance);

        // Smaller queue = higher score
        score += (20 - info.waiting);

        // More doctors = higher score
        score += info.doctors;

        // Department available?
        if(department && info.departments.includes(department)){
            score += 20;
        }

        if(score > bestScore){
            bestScore = score;
            bestHospital = hospital;
        }

    });

    return bestHospital;

}

let selectedVillage="";

let selectedHospital="";

const patient={

name:"",
age:"",
gender:"",
mobile:"",
abha:"",
village:"",
hospital:"",
department:"",

};

let familyMembers=[];

let selectedFamilyMember="";

let tokenNumber = 101;

let appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

let offlineAppointments =
JSON.parse(localStorage.getItem("offlineAppointments")) || [];

// Current UI language (default English)
let currentLang = 'en';

let currentQueueIndex = 0;

const doctors={

"General Medicine":[
{
name:"Dr. Amit Patel",
specialization:"General Physician",
experience:"10 Years",
rating:"4.8"
},
{
name:"Dr. Rahul Mehta",
specialization:"General Physician",
experience:"6 Years",
rating:"4.5"
}
],

"Women's Health":[
{
name:"Dr. Priya Sharma",
specialization:"Gynecologist",
experience:"12 Years",
rating:"4.9"
}
],

"Child Care":[
{
name:"Dr. Sneha Joshi",
specialization:"Pediatrician",
experience:"9 Years",
rating:"4.7"
}
],

"Dental":[
{
name:"Dr. Neha Shah",
specialization:"Dental Surgeon",
experience:"8 Years",
rating:"4.6"
}
],

"Eye Care":[
{
name:"Dr. Vivek Kumar",
specialization:"Ophthalmologist",
experience:"15 Years",
rating:"4.9"
}
]

};

let authMode = 'login';

function switchAuthMode(mode) {
    authMode = mode;
    const authName = document.getElementById('authName');
    const authSubmit = document.getElementById('authSubmit');
    const authMessage = document.getElementById('authMessage');
    const buttons = document.querySelectorAll('.auth-switch button');

    buttons.forEach((button) => button.classList.toggle('active', button.textContent.toLowerCase() === mode));

    if (authName) {
        authName.style.display = mode === 'signup' ? 'block' : 'none';
    }

    if (authSubmit) {
        authSubmit.textContent = mode === 'signup' ? 'Create Account' : 'Login';
    }

    if (authMessage) {
        authMessage.textContent = mode === 'signup' ? 'Create a patient account to book services faster.' : 'Sign in to continue to your health dashboard.';
    }
}

async function handleAuthSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('authName');
    const emailInput = document.getElementById('authEmail');
    const passwordInput = document.getElementById('authPassword');
    const authMessage = document.getElementById('authMessage');

    const payload = {
        email: emailInput.value.trim(),
        password: passwordInput.value
    };

    if (authMode === 'signup') {
        payload.name = nameInput.value.trim();
    }

    try {
        const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
        const data = await fetchJson(endpoint, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (authMessage) {
            authMessage.textContent = `${authMode === 'signup' ? 'Account created' : 'Signed in'} successfully for ${data.user?.name || data.user?.email}.`;
        }

        if (data.user?.role === 'doctor' || data.user?.role === 'admin') {
            showDashboard();
        } else {
            showRegistration();
        }
    } catch (error) {
        if (authMessage) {
            authMessage.textContent = error.message || 'Authentication failed.';
        }
    }
}

function showRegistration(){

document.getElementById("homePage").style.display="none";

document.getElementById("registrationPage").style.display="block";

}

function registerPatient(){

let name=document.getElementById("name").value.trim();
let age=document.getElementById("age").value.trim();
let gender=document.getElementById("gender").value;
let mobile=document.getElementById("mobile").value.trim();
let abha=document.getElementById("abha").value.trim();

const ageNumber = Number(age);
const isValidAge = /^\d{1,3}$/.test(age);
const isValidMobile = /^\d{10}$/.test(mobile);

if(name=="" || age=="" || gender=="Select Gender" || mobile==""){

alert((translations[currentLang]||translations.en).messages.fillDetails);
return;

}

if(!isValidAge || ageNumber <= 0 || ageNumber > 120){
    alert('Please enter a valid age between 1 and 120.');
    return;
}

if(!isValidMobile){
    alert('Please enter a valid 10-digit mobile number.');
    return;
}

patient.name=name;
patient.age=age;
patient.gender=gender;
patient.mobile=mobile;
patient.abha=abha;

familyMembers=[

patient.name,

"Father",

"Mother",

"Child"

];

loadFamily();

document.getElementById("registrationPage").style.display="none";

document.getElementById("familyPage").style.display="block";

}

function selectVillage(){

if(selectedVillage==""){

alert((translations[currentLang]||translations.en).messages.selectVillage);
return;

}

patient.village=selectedVillage;

document.getElementById("villagePage").style.display="none";
document.getElementById("hospitalPage").style.display="block";

}

function chooseVillage(village,id){

selectedVillage=village;

let buttons=document.getElementsByClassName("village-btn");

for(let i=0;i<buttons.length;i++){

buttons[i].classList.remove("selected");

}

document.getElementById(id).classList.add("selected");

}

function chooseHospital(hospital, element){

    selectedHospital = hospital;

    let cards =
    document.getElementsByClassName("hospital-card");

    for(let i=0;i<cards.length;i++){

        cards[i].classList.remove("selectedHospital");

    }

    element.classList.add("selectedHospital");

}

function continueHospital(){

if(selectedHospital==""){

alert((translations[currentLang]||translations.en).messages.selectHospital);
return;

}

let recommended = recommendHospital(patient.village, patient.department);

console.log("Recommended Hospital:", recommended);

patient.hospital=selectedHospital;

document.getElementById("hospitalPage").style.display="none";

document.getElementById("medicinePage").style.display="block";

loadMedicineStock();

}

let selectedDepartment="";

function chooseDepartment(department, element){

    selectedDepartment = department;

    let cards = document.getElementsByClassName("department-card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("selectedDepartment");
    }

    if (element && element.classList) element.classList.add("selectedDepartment");

}

let selectedDoctor="";

function continueDepartment(){

if(selectedDepartment==""){

alert((translations[currentLang]||translations.en).messages.selectDepartment);

return;

}

patient.department=selectedDepartment;

let recommendedHospital =
recommendHospital(
    patient.village,
    patient.department
);

alert(
"🏥 R2A Recommendation\n\n" +
recommendedHospital +
"\n\nThis hospital is recommended based on distance, waiting time and department availability."
);

document.getElementById("departmentPage").style.display="none";

document.getElementById("doctorPage").style.display="block";

loadDoctors();

}

function loadDoctors(){

let list=document.getElementById("doctorList");

list.innerHTML="";

document.getElementById("doctorHeading").innerHTML=
(translations[currentLang]||translations.en).messages.availableDoctorsPrefix + patient.department;

let departmentDoctors=doctors[patient.department] || [];

if(departmentDoctors.length === 0){
    list.innerHTML = `

<div class="doctor-card">

<h3>No doctors available</h3>

<p>Please choose another department or contact the hospital desk.</p>

</div>

`;
    return;
}

departmentDoctors.forEach(function(doc){

list.innerHTML+=`

<div class="doctor-card"

onclick="chooseDoctor('${doc.name}',this)">

<h3>👨‍⚕️ ${doc.name}</h3>

<p>${doc.specialization}</p>

<p>⭐ ${doc.rating}</p>

<p>📅 ${doc.experience}</p>

</div>

`;

});

}

function chooseDoctor(name,element){

selectedDoctor=name;

let cards=document.getElementsByClassName("doctor-card");

for(let i=0;i<cards.length;i++){

cards[i].classList.remove("selectedDoctor");

}

element.classList.add("selectedDoctor");

}

function continueDoctor(){

if(selectedDoctor==""){

alert((translations[currentLang]||translations.en).messages.selectDoctor);

return;

}

patient.doctor=selectedDoctor;

console.log(patient);

document.getElementById("doctorPage").style.display="none";

document.getElementById("slotPage").style.display="block";

document.getElementById("doctorSelected").innerHTML=
(translations[currentLang]||translations.en).messages.doctorPrefix + selectedDoctor;

}

let selectedSlot="";

function chooseSlot(slot,element){

selectedSlot=slot;

let cards=document.getElementsByClassName("slot-card");

for(let i=0;i<cards.length;i++){

cards[i].classList.remove("selectedSlot");

}

element.classList.add("selectedSlot");

}

async function continueSlot(){

if(selectedSlot==""){

alert((translations[currentLang]||translations.en).messages.selectTimeSlot);

return;

}

if(!patient.name || !patient.hospital || !patient.department || !patient.doctor){
    alert('Please complete the booking details before confirming the appointment.');
    return;
}

patient.slot=selectedSlot;

patient.token="A"+tokenNumber;
patient.appointmentID =
"APP-" + new Date().getFullYear() + tokenNumber;

patient.patientID = "R2A-" + tokenNumber;

// Display Date
patient.date=new Date().toLocaleDateString("en-IN",{

day:"numeric",

month:"long",

year:"numeric"

});

// Hidden date for reminder logic
patient.dateValue=new Date().toISOString().split("T")[0];
patient.status="Confirmed";

patient.createdAt =
new Date().toLocaleTimeString();
appointments.push({...patient});
// Save latest appointment for reminder
localStorage.setItem("latestAppointment", JSON.stringify(patient));

localStorage.setItem(
    "appointments",
    JSON.stringify(appointments)
);

try {
    await saveAppointmentToBackend({...patient});
} catch (error) {
    console.warn("Unable to sync appointment with backend", error);
}

tokenNumber++;

document.getElementById("slotPage").style.display="none";

showAppointment();

}

function showAppointment(){

    document.getElementById("confirmationPage").style.display="block";

    document.getElementById("confirmationPage").animate(

[

{opacity:0,transform:"scale(.8)"},

{opacity:1,transform:"scale(1)"}

],

{

duration:500

}

);

    const t = translations[currentLang] || translations.en;

    document.getElementById("appointmentSlip").innerHTML = `

    <div class="receipt">

        <h2>🇮🇳 Government of India</h2>

        <h3>R2A</h3>

        <p>Rural Reach Appointment Access</p>

        <hr>

        <h3 style="color:green;">${t.confirmation && t.confirmation.title ? t.confirmation.title : '✅ Appointment Confirmed'}</h3>

        <div class="appointment-slip-card">
            <div class="slip-details">
                <span>${t.labels.patientName}</span>
                <strong>${patient.name}</strong>

                <span>Family Member</span>
                <strong>${patient.familyMember}</strong>

                <span>${t.labels.hospital}</span>
                <strong>${patient.hospital}</strong>

                <span>${t.labels.department}</span>
                <strong>${patient.department}</strong>

                <span>${t.labels.doctor}</span>
                <strong>${patient.doctor}</strong>

                <span>${t.labels.date}</span>
                <strong>${patient.date}</strong>

                <span>${t.labels.time}</span>
                <strong>${patient.slot}</strong>

                <span>${t.labels.token}</span>
                <strong>${patient.token}</strong>

                <span>${t.labels.appointmentID}</span>
                <strong>${patient.appointmentID}</strong>

                <span>${t.labels.patientID}</span>
                <strong>${patient.patientID}</strong>

                ${patient.abha ? `<span>ABHA ID</span><strong>${patient.abha}</strong>` : ""}

                <span>Estimated Waiting</span>
                <strong>${appointments.length*8} Minutes</strong>

                <span>${t.labels.status}</span>
                <strong>${patient.status}</strong>
            </div>

            <div id="qrcode" class="slip-qr"></div>
        </div>

        <hr>

        <p style="text-align:center;">
            ${t.labels.arriveNote}
        </p>

    </div>

    `;

    // Generate QR Code AFTER the HTML is created
    new QRCode(document.getElementById("qrcode"),{
        text:
        patient.token + " | " +
        patient.name + " | " +
        patient.hospital,

        width:120,
        height:120
    });

}

function showDashboard(){

document.getElementById("homePage").style.display="none";

document.getElementById("dashboardPage").style.display="block";

loadDashboard();

}

async function loadDashboard(){

let savedAppointments =
JSON.parse(localStorage.getItem("appointments")) || [];

try {
    const remoteAppointments = await fetchJson('/api/appointments');
    if (Array.isArray(remoteAppointments) && remoteAppointments.length > 0) {
        savedAppointments = remoteAppointments;
        appointments = remoteAppointments;
        localStorage.setItem("appointments", JSON.stringify(savedAppointments));
    }
} catch (error) {
    console.warn("Dashboard sync failed, using local data", error);
}

document.getElementById("totalPatients").innerHTML =
savedAppointments.length;

document.getElementById("appointmentCount").innerHTML =
savedAppointments.length;

if(savedAppointments.length>0){

currentQueueIndex = 0;

document.getElementById("currentToken").innerHTML =
savedAppointments[currentQueueIndex].token;

if(savedAppointments.length>1){

document.getElementById("nextToken").innerHTML =
savedAppointments[1].token;

}else{

document.getElementById("nextToken").innerHTML =
"None";

}

}

let totalCampRegistrations=0;

healthCamps.forEach(function(c){

totalCampRegistrations += (20-c.seats);

});

document.getElementById("appointmentCount").innerHTML=

savedAppointments.length+

" + "+totalCampRegistrations+" Camps";

let ratings =
JSON.parse(localStorage.getItem("feedbacks")) || [];

if(ratings.length>0){

document.getElementById("appointmentCount").innerHTML +=

"<br>⭐ Feedback : "+ratings.length;

}

let estimatedMinutes = savedAppointments.length * 8;

document.getElementById("waitingTime").innerHTML =
estimatedMinutes + " Min";

document.getElementById("patientsAhead").innerHTML =
"Patients Ahead : " + savedAppointments.length;

}

function restartBooking(){

location.reload();

}

let selectedSymptom = "";

function showAIPage(){

document.getElementById("homePage").style.display="none";

document.getElementById("aiPage").style.display="block";

}

let aiDepartment="";
let aiHospital="";
let aiDoctor="";

function aiRecommendation(){

let symptoms=[];

document.querySelectorAll("#aiPage input[type='checkbox']:checked")

.forEach(function(item){

symptoms.push(item.value);

});

if(symptoms.length==0){

alert((translations[currentLang]||translations.en).messages.selectAtLeastOneSymptom);

return;

}

let department="";
let hospital="";
let doctor="";
let priority="";
let reason="";

if(symptoms.includes("Chest Pain")){

department="Emergency";

hospital="District Hospital";

doctor="Emergency Team";

priority="🔴 RED";

reason="Chest Pain requires immediate medical attention.";

}

else if(symptoms.includes("Pregnancy")){

department="Women's Health";

hospital="Community Health Centre";

doctor="Dr Priya Sharma";

priority="🟢 GREEN";

reason="Pregnancy requires Women's Health care.";

}

else if(symptoms.includes("Tooth Pain")){

department="Dental";

hospital="District Hospital";

doctor="Dr Neha Shah";

priority="🟡 YELLOW";

reason="Dental issues require Dental care.";

}

else if(symptoms.includes("Eye Problem")){

department="Eye Care";

hospital="District Hospital";

doctor="Dr Vivek Kumar";

priority="🟡 YELLOW";

reason="Eye problems require an Eye specialist.";

}

else{

department="General Medicine";

hospital="Primary Health Centre";

doctor="Dr Amit Patel";

priority="🟢 GREEN";

reason="General symptoms should first visit General Medicine.";

}

aiDepartment=department;

aiHospital=hospital;

aiDoctor=doctor;

const t = translations[currentLang] || translations.en;
document.getElementById("aiDepartment").innerHTML =
    "🩺 " + (t.labels.department || 'Department') + ' : ' + department;

document.getElementById("aiHospital").innerHTML =
    "🏥 " + (t.labels.hospital || 'Hospital') + ' : ' + hospital;

document.getElementById("aiDoctor").innerHTML =
    "👨‍⚕️ " + (t.messages.doctorPrefix || 'Doctor : ') + doctor;

document.getElementById("aiPriority").innerHTML=

priority;

document.getElementById("aiReason").innerHTML=

reason;

document.getElementById("aiPage").style.display="none";

document.getElementById("aiResultPage").style.display="block";

}

function showHistory(){

document.getElementById("confirmationPage").style.display="none";

document.getElementById("historyPage").style.display="block";

let list=document.getElementById("historyList");

list.innerHTML="";

appointments.forEach(function(app){

list.innerHTML += `

<div class="receipt">

<p><b>Patient:</b> ${app.name}</p>

<p><b>Hospital:</b> ${app.hospital}</p>

<p><b>Doctor:</b> ${app.doctor}</p>

<p><b>Date:</b> ${app.date}</p>

<p><b>Token:</b> ${app.token}</p>

<p><b>Appointment ID:</b> ${app.appointmentID}</p>

<p><b>Booked At:</b> ${app.createdAt}</p>

<hr>

</div>

`;

});

}

function goHome(){

location.reload();

}

function nextPatient(){

let savedAppointments =
JSON.parse(localStorage.getItem("appointments")) || [];

if(savedAppointments.length==0){

alert("No appointments today.");

return;

}

if(currentQueueIndex < savedAppointments.length-1){

currentQueueIndex++;

document.getElementById("currentToken").innerHTML =
savedAppointments[currentQueueIndex].token;

let remaining =
savedAppointments.length-currentQueueIndex-1;

document.getElementById("patientsAhead").innerHTML=

"Patients Ahead : "+remaining;

document.getElementById("waitingTime").innerHTML=

(remaining*8)+" Min";

document.getElementById("nextToken").innerHTML =
currentQueueIndex < savedAppointments.length-1 ?
savedAppointments[currentQueueIndex+1].token :
"Completed";

}

else{

alert("All patients completed.");

}

}

function showAshaPortal(){

document.getElementById("homePage").style.display="none";

document.getElementById("ashaPage").style.display="block";

}

function ashaVillage(village){

let totalRegistered=0;

healthCamps.forEach(function(c){

totalRegistered += (20-c.seats);

});

alert(

"🌾 "+village+

"\n\nHealth Camp Registrations : "+totalRegistered+

"\n\nOffline Bookings Available"

);

}

function saveOfflineBooking(){

    let sampleAppointment = {

        patient:"Offline Patient",

        village:"Village A",

        hospital:"Primary Health Centre",

        status:"Pending Sync"

    };

    offlineAppointments.push(sampleAppointment);

    localStorage.setItem(
        "offlineAppointments",
        JSON.stringify(offlineAppointments)
    );

    alert("📴 Appointment saved offline successfully!");

}

function syncAppointments(){

    if(offlineAppointments.length==0){

        alert("No offline appointments found.");

        return;

    }

    offlineAppointments.forEach(function(app){

        appointments.push(app);

    });

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    offlineAppointments = [];

    localStorage.setItem(
        "offlineAppointments",
        JSON.stringify([])
    );

    alert("✅ Offline appointments synced successfully!");

}

function showDoctorDashboard(){

document.getElementById("homePage").style.display="none";

document.getElementById("doctorDashboard").style.display="block";

loadDoctorPatients();

}

async function loadDoctorPatients(){

let list=document.getElementById("doctorPatients");

list.innerHTML="";

try {
    const remoteAppointments = await fetchJson('/api/appointments');
    if (Array.isArray(remoteAppointments)) {
        appointments = remoteAppointments;
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }
} catch (error) {
    console.warn("Unable to load doctor appointments from backend", error);
}

appointments.forEach(function(app){

list.innerHTML +=` 

<div class="receipt">

<p><b>Patient:</b> ${app.name || app.patient}</p>

<p><b>Token:</b> ${app.token}</p>

<p><b>Time:</b> ${app.slot}</p>

<p><b>Status:</b> ${app.status}</p>

<button onclick="completeAppointment('${app.token}')">

✔ Complete

</button>

</div>

`;

});

}

async function completeAppointment(token){

try {
    const updated = await fetchJson(`/api/appointments/${token}/complete`, { method: 'PUT' });
    const match = appointments.find((app) => app.token === token);
    if (match) {
        match.status = updated.status;
    }
    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );
    await loadDoctorPatients();
    alert("Appointment Completed.");
} catch (error) {
    console.warn("Unable to complete appointment", error);
    alert("Unable to complete appointment right now.");
}

}

function continueAIBooking(){

patient.department=aiDepartment;

patient.hospital=aiHospital;

document.getElementById("aiResultPage").style.display="none";

if(aiDepartment === "Emergency"){

document.getElementById("emergencyPage").style.display="block";

return;

}

document.getElementById("doctorPage").style.display="block";

loadDoctors();

}

function showEmergencyPage(){

document.getElementById("homePage").style.display="none";

document.getElementById("emergencyPage").style.display="block";

}

function backHome(){

document.getElementById("emergencyPage").style.display="none";

document.getElementById("homePage").style.display="block";

}

function callAmbulance(){

window.location.href="tel:108";

}

window.onload=function(){

let reminder=localStorage.getItem("latestAppointment");

if(!reminder) return;

let data=JSON.parse(reminder);

let today=new Date();

let appointmentDate=new Date(data.dateValue);

let difference=Math.ceil(

(appointmentDate-today)/(1000*60*60*24)

);

let countdown="";

if(difference==0){

countdown="📅 Your appointment is TODAY.";

}

else if(difference==1){

countdown="⏳ Your appointment is TOMORROW.";

}

else if(difference>1){

countdown="⏳ Appointment in "+difference+" days.";

}

else{

countdown="⚠ Appointment date has passed.";

}

// Show only today or tomorrow

if(difference<=1 && difference>=0){

document.getElementById("reminderText").innerHTML=

"<h3 style='color:#1565C0'>"+countdown+"</h3><br>"+

"<b>"+data.name+"</b><br><br>"+

"🏥 "+data.hospital+"<br>"+

"👨‍⚕️ "+data.doctor+"<br>"+

"🕒 "+data.slot+"<br>"+

"📅 "+data.date;

document.getElementById("reminderPopup").style.display="flex";

}

}

function closeReminder(){

document.getElementById("reminderPopup").style.display="none";

}

function dismissReminder(){

localStorage.removeItem("latestAppointment");

document.getElementById("reminderPopup").style.display="none";

}

function startVoiceBooking(){

if(!('webkitSpeechRecognition' in window)){

alert("Speech Recognition is not supported in this browser.");

return;

}

const recognition=new webkitSpeechRecognition();

// set recognition language based on currentLang
recognition.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'gu' ? 'gu-IN' : 'en-IN');

recognition.start();

alert((translations[currentLang]||translations.en).messages.listening);

recognition.onresult=function(event){

let speech=event.results[0][0].transcript.toLowerCase();

alert((translations[currentLang]||translations.en).messages.youSaid + speech);

detectSymptomsFromVoice(speech);

};

}

function detectSymptomsFromVoice(text){

    // Clear previous selections
    document.querySelectorAll("#aiPage input[type='checkbox']").forEach(function(item){
        item.checked=false;
    });

    // define keyword map for English, Hindi, Gujarati
    const keywords = {
        'Fever': ['fever','बुखार','જ્વર'],
        'Cold': ['cold','cough','khansi','कफ','खाँसी','सर्दी','ઠંડી','કફ'],
        'Headache': ['headache','सिरदर्द','माथा','માથા','માથાનો'],
        'Tooth Pain': ['tooth','dental','toothache','दांत','દાંત'],
        'Eye Problem': ['eye','आंख','आँख','આંખ'],
        'Pregnancy': ['pregnant','pregnancy','गर्भ','गर्भावस्था','ગર્ભ'],
        'Child Health': ['child','baby','बच्चा','बच्चों','બાળકો'],
        'Bone Pain': ['bone','हड्डी','હાડકાં'],
        'Chest Pain': ['chest','सीन','सीने','છાતી','છાતીનો']
    };

    const lower = text.toLowerCase();

    Object.keys(keywords).forEach(function(sym){
        const kws = keywords[sym];
        for(let i=0;i<kws.length;i++){
            if(lower.includes(kws[i])){
                checkSymptom(sym);
                break;
            }
        }
    });

    alert("Symptoms detected successfully.");

}

function checkSymptom(name){

document.querySelectorAll("#aiPage input[type='checkbox']").forEach(function(item){

if(item.value==name){

item.checked=true;

}

});

}

// Simple translations map for UI elements and symptoms
const translations = {
    en: {
        appTitle: '🏥 R2A',
        appSubtitle: 'Rural Reach Appointment Access',
        eyebrow: 'Rural Healthcare Access',
        heroTitle: 'Book government hospital appointments easily',
        portal: [
            {title: '👤 Patient Portal', desc: 'Book Government Hospital Appointment'},
            {title: '🏥 Hospital Dashboard', desc: "Manage Today's Queue"},
            {title: '👨‍⚕️ Doctor Dashboard', desc: 'View Assigned Patients'},
            {title: '🌾 ASHA Worker Portal', desc: 'Village Registration & Offline Booking'}
        ],
        registrationHeader: 'Patient Registration',
        placeholders: {name: 'Patient Name', age: 'Age', gender: 'Select Gender', mobile: 'Mobile Number'},
        buttons: {open: 'Open', continue: 'Continue', speak: '🎤 Speak Symptoms', getRecommendation: 'Get Recommendation', book: 'Book Appointment', print: '🖨 Print Appointment', history: '📜 Appointment History'},
        ai: {title: '🤖 AI Health Assistant', selectSymptoms: 'Select your symptoms'},
        aiResult: {title: '🤖 AI Recommendation'},
        confirmation: {title: '✅ Appointment Confirmed', print: '🖨 Print Appointment', history: '📜 Appointment History', bookAnother: 'Book Another Appointment'},
        labels: {patientName:'Patient Name', appointmentID:'Appointment ID', patientID:'Patient ID', village:'Village', hospital:'Hospital', department:'Department', doctor:'Doctor', date:'Date', time:'Time', token:'Token', status:'Status', arriveNote:'Please arrive 15 minutes before your appointment.'},
        messages: {fillDetails:'Please fill all details.', selectVillage:'Please select a village.', selectHospital:'Please select a hospital.', selectDepartment:'Please select a department.', selectDoctor:'Please select a doctor.', selectTimeSlot:'Please select a time slot.', selectAtLeastOneSymptom:'Please select at least one symptom.', listening:'🎤 Listening... Please speak your symptoms.', youSaid:'You said : ', welcomePrefix:'Welcome, ', availableDoctorsPrefix:'Available Doctors - ', doctorPrefix:'Doctor : '},
        symptoms: {
            'Fever':'Fever', 'Cold':'Cold / Cough', 'Headache':'Headache', 'Tooth Pain':'Tooth Pain', 'Eye Problem':'Eye Problem', 'Pregnancy':'Pregnancy', 'Child Health':'Child Health', 'Bone Pain':'Bone Pain', 'Chest Pain':'Chest Pain'
        }
    },
    hi: {
        appTitle: '🏥 R2A',
        appSubtitle: 'ग्रामीण पहुँच नियुक्ति',
        eyebrow: 'ग्रामीण स्वास्थ्य पहुँच',
        heroTitle: 'सरकारी अस्पताल अपॉइंटमेंट आसानी से बुक करें',
        portal: [
            {title: '👤 रोगी पोर्टल', desc: 'सरकारी अस्पताल में अपॉइंटमेंट बुक करें'},
            {title: '🏥 अस्पताल डैशबोर्ड', desc: 'आज की कतार प्रबंधित करें'},
            {title: '👨‍⚕️ डॉक्टर डैशबोर्ड', desc: 'नियत किए गए मरीज देखें'},
            {title: '🌾 ASHA वर्कर पोर्टल', desc: 'ग्राम पंजीकरण और ऑफ़लाइन बुकिंग'}
        ],
        registrationHeader: 'रोगी पंजीकरण',
        placeholders: {name: 'रोगी का नाम', age: 'आयु', gender: 'लिंग चुनें', mobile: 'मोबाइल नंबर'},
        buttons: {open: 'खोलें', continue: 'आगे', speak: '🎤 लक्षण बोलें', getRecommendation: 'सुझाव पाएं', book: 'अपॉइंटमेंट बुक करें', print: '🖨 प्रिंट अपॉइंटमेंट', history: '📜 अपॉइंटमेंट इतिहास'},
        ai: {title: '🤖 एआई हेल्थ असिस्टेंट', selectSymptoms: 'अपनी लक्षण चुनें'},
        aiResult: {title: '🤖 एआई अनुशंसा'},
        confirmation: {title: '✅ अपॉइंटमेंट पुष्टि', print: '🖨 अपॉइंटमेंट प्रिंट', history: '📜 अपॉइंटमेंट इतिहास', bookAnother: 'एक और अपॉइंटमेंट बुक करें'},
        labels: {patientName:'रोगी का नाम', appointmentID:'अपॉइंटमेंट आईडी', patientID:'रोगी आईडी', village:'गाँव', hospital:'अस्पताल', department:'विभाग', doctor:'डॉक्टर', date:'तारीख', time:'समय', token:'टोकन', status:'स्थिति', arriveNote:'कृपया अपनी अपॉइंटमेंट से 15 मिनट पहले पहुँचे।'},
        messages: {fillDetails:'कृपया सभी विवरण भरें।', selectVillage:'कृपया अपना गांव चुनें।', selectHospital:'कृपया अस्पताल चुनें।', selectDepartment:'कृपया विभाग चुनें।', selectDoctor:'कृपया डॉक्टर चुनें।', selectTimeSlot:'कृपया एक समय स्लॉट चुनें।', selectAtLeastOneSymptom:'कृपया कम से कम एक लक्षण चुनें।', listening:'🎤 सुन रहा है... कृपया अपने लक्षण बोलें।', youSaid:'आपने कहा : ', welcomePrefix:'स्वागत है, ', availableDoctorsPrefix:'उपलब्ध डॉक्टर - ', doctorPrefix:'डॉक्टर : '},
        symptoms: {
            'Fever':'बुखार', 'Cold':'खाँसी / सर्दी', 'Headache':'सिरदर्द', 'Tooth Pain':'दांत में दर्द', 'Eye Problem':'आँख की समस्या', 'Pregnancy':'गर्भावस्था', 'Child Health':'बच्चों का स्वास्थ्य', 'Bone Pain':'हड्डी में दर्द', 'Chest Pain':'सीने में दर्द'
        }
    },
    gu: {
        appTitle: '🏥 R2A',
        appSubtitle: 'ગ્રામીણ પહોચ અપોઇન્ટમેન્ટ',
        eyebrow: 'ગ્રામીણ આરોગ્ય પ્રવેશ',
        heroTitle: 'સરકારી હોસ્પિટાલ એપોઇન્ટમેન્ટ સહેલાઈથી બુક કરો',
        portal: [
            {title: '👤 દર્દી પોર્ટલ', desc: 'સરકારી હોસ્પિટલમાં મુલાકાત બુક કરો'},
            {title: '🏥 હોસ્પિટલ ડેશબોર્ડ', desc: 'આજની ક્યુ મેનેજ કરો'},
            {title: '👨‍⚕️ ડોકટર ડેશબોર્ડ', desc: 'આપેલા દર્દીઓને જુઓ'},
            {title: '🌾 ASHA વર્કર પોર્ટલ', desc: 'ગામ રજીસ્ટ્રેશન અને ઓફલાઇન બુકિંગ'}
        ],
        registrationHeader: 'દર્દી નોંધણી',
        placeholders: {name: 'દર્દીનું નામ', age: 'ઉમર', gender: 'લિંગ પસંદ કરો', mobile: 'મોબાઇલ નંબર'},
        buttons: {open: 'ખોલો', continue: 'આગળ', speak: '🎤 લક્ષણો કહો', getRecommendation: 'સુશંશા મેળવો', book: 'એપોઇન્ટમેન્ટ બુક કરો', print: '🖨 પ્રિન્ટ એપોઇન્ટમેન્ટ', history: '📜 એપોઇન્ટમેન્ટ ઇતિહાસ'},
        ai: {title: '🤖 એઆઈ હેલ્થ આસિસ્ટન્ટ', selectSymptoms: 'તમારા લક્ષણો પસંદ કરો'},
        aiResult: {title: '🤖 એઆઈ ભલામણ'},
        confirmation: {title: '✅ અપોઇન્ટમેન્ટ પુષ્ટિ', print: '🖨 અપોઇન્ટમેન્ટ પ્રિન્ટ', history: '📜 અપોઇન્ટમેન્ટ ઇતિહાસ', bookAnother: 'બેક અરે અપોઇન્ટમેન્ટ'},
        labels: {patientName:'દર્દીનું નામ', appointmentID:'એપોઇન્ટમેન્ટ ID', patientID:'દર્દી ID', village:'ગામ', hospital:'હોસ્પિટલ', department:'વૈભાગ', doctor:'ડોકટર', date:'તારીખ', time:'સમય', token:'ટોકન', status:'સ્થિતિ', arriveNote:'કૃપા કરીને вашей અપોઇન્ટમેન્ટથી 15 મિનિટ પહેલા પહોંચો.'},
        messages: {fillDetails:'કૃપા કરીને બધા વિગતીઓને ભરો.', selectVillage:'કૃપા કરીને તમારું ગામ પસંદ કરો.', selectHospital:'કૃપા કરીને હોસ્પિટલ પસંદ કરો.', selectDepartment:'કૃપા કરીને વિભાગ પસંદ કરો.', selectDoctor:'કૃપા કરીને ડોક્ટર પસંદ કરો.', selectTimeSlot:'કૃપા કરીને એક સમય સ્લોટ પસંદ કરો.', selectAtLeastOneSymptom:'કૃપા કે તમે ઓછામાં ઓછા એક લક્ષણ પસંદ કરો.', listening:'🎤 સાંભળતો... કૃપા કરીને તમારા લક્ષણો બોલો.', youSaid:'તમે જણાવ્યું : ', welcomePrefix:'સ્વાગત છે, ', availableDoctorsPrefix:'ઉપલબ્ધ ડોક્ટર્સ - ', doctorPrefix:'ડોક્ટર : '},
        symptoms: {
            'Fever':'જ્વર', 'Cold':'ઠંડી / કફ', 'Headache':'માથાનો દુખાવો', 'Tooth Pain':'દાંતનો દુખાવો', 'Eye Problem':'આંખની સમસ્યા', 'Pregnancy':'ગર્ભાવસ્થા', 'Child Health':'બાળકોનું આરોગ્ય', 'Bone Pain':'હાડકાંમાં દુખાવું', 'Chest Pain':'છાતીમાં દુખાવું'
        }
    }
};

function changeLanguage(){
    const sel = document.getElementById('languageSelect');
    if(!sel) return;
    const lang = sel.value || 'en';
    currentLang = lang;
    // set document language attribute
    document.documentElement.lang = lang;

    const t = translations[lang] || translations.en;

    // update top titles
    const appTitle = document.getElementById('appTitle');
    if(appTitle) appTitle.textContent = t.appTitle;
    const appSubtitle = document.getElementById('appSubtitle');
    if(appSubtitle) appSubtitle.textContent = t.appSubtitle;
    const eyebrow = document.querySelector('.eyebrow');
    if(eyebrow) eyebrow.textContent = t.eyebrow;
    const heroTitle = document.getElementById('heroTitle');
    if(heroTitle) heroTitle.textContent = t.heroTitle;

    // portal cards
    const portalCards = document.querySelectorAll('.portal-grid .portal-card:not(.featured-card):not(.emergency-card)');
    portalCards.forEach(function(card, idx){
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if(t.portal[idx]){
            if(h3) h3.textContent = t.portal[idx].title;
            if(p) p.textContent = t.portal[idx].desc;
        }
        const btn = card.querySelector('button');
        if(btn) btn.textContent = t.buttons.open;
    });

    // registration placeholders and header
    const regH2 = document.querySelector('#registrationPage h2');
    if(regH2) regH2.textContent = t.registrationHeader;
    const nameInput = document.getElementById('name');
    if(nameInput) nameInput.placeholder = t.placeholders.name;
    const ageInput = document.getElementById('age');
    if(ageInput) ageInput.placeholder = t.placeholders.age;
    const genderSelect = document.getElementById('gender');
    if(genderSelect){
        // set first option
        if(genderSelect.options && genderSelect.options.length>0) genderSelect.options[0].text = t.placeholders.gender;
    }
    const mobileInput = document.getElementById('mobile');
    if(mobileInput) mobileInput.placeholder = t.placeholders.mobile;

    // buttons with onclick handlers: set common labels
    document.querySelectorAll('button[onclick*="registerPatient"]').forEach(b=>b.textContent = t.buttons.continue);
    document.querySelectorAll('button[onclick*="selectVillage"]').forEach(b=>b.textContent = t.buttons.continue);
    document.querySelectorAll('button[onclick*="continueHospital"]').forEach(b=>b.textContent = t.buttons.continue);
    document.querySelectorAll('button[onclick*="continueDepartment"]').forEach(b=>b.textContent = t.buttons.continue);
    document.querySelectorAll('button[onclick*="continueDoctor"]').forEach(b=>b.textContent = t.buttons.continue);
    document.querySelectorAll('button[onclick*="continueSlot"]').forEach(b=>b.textContent = t.buttons.book || t.buttons.continue);

    // AI page headings and buttons
    const aiH2 = document.querySelector('#aiPage h2');
    if(aiH2) aiH2.textContent = t.ai.title;
    const aiP = document.querySelector('#aiPage p');
    if(aiP) aiP.textContent = t.ai.selectSymptoms;
    document.querySelectorAll('#aiPage button[onclick*="startVoiceBooking"]').forEach(b=>b.textContent = t.buttons.speak);
    document.querySelectorAll('#aiPage button[onclick*="aiRecommendation"]').forEach(b=>b.textContent = t.buttons.getRecommendation);

    // AI result headings
    const aiResultH2 = document.querySelector('#aiResultPage h2');
    if(aiResultH2) aiResultH2.textContent = t.aiResult.title || t.aiResult.title;

    // symptoms (checkbox labels)
    document.querySelectorAll('#aiPage label.symptom-card').forEach(function(label){
        const input = label.querySelector('input');
        if(!input) return;
        const key = input.value;
        const text = (t.symptoms && t.symptoms[key]) ? t.symptoms[key] : key;
        // preserve input element
        label.innerHTML = '';
        label.appendChild(input);
        label.appendChild(document.createTextNode(' ' + text));
    });

    // store preference
    try{ localStorage.setItem('r2a_lang', lang); }catch(e){}

}

// Initialize language on load from saved preference
window.addEventListener('DOMContentLoaded', function(){
    const saved = (localStorage.getItem('r2a_lang')) || 'en';
    const sel = document.getElementById('languageSelect');
    if(sel) sel.value = saved;
    changeLanguage();
});

function loadMedicineStock(){

let list=document.getElementById("medicineList");

list.innerHTML="";

medicineStock[selectedHospital].forEach(function(medicine){

list.innerHTML += `

<div class="hospital-card">

<b>${medicine.name}</b>

<br>

${medicine.status}

</div>

`;

});

}

function continueMedicine(){

document.getElementById("medicinePage").style.display="none";

document.getElementById("patientGreeting").innerHTML=

"Welcome, "+patient.name+"!";

document.getElementById("departmentPage").style.display="block";

}

function showHealthCamp(){

document.getElementById("homePage").style.display="none";

document.getElementById("healthCampPage").style.display="block";

loadHealthCamps();

}

function loadHealthCamps(){

let list=document.getElementById("campList");

list.innerHTML="";

healthCamps.forEach(function(camp,index){

list.innerHTML+=`

<div class="hospital-card">

<h3>${camp.name}</h3>

<p>📅 ${camp.date}</p>

<p>📍 ${camp.location}</p>

<p>👥 Seats Left : ${camp.seats}</p>

<button onclick="registerCamp(${index})">

Register

</button>

</div>

`;

});

}

function registerCamp(index){

if(healthCamps[index].seats<=0){

alert("❌ No seats available.");

return;

}

healthCamps[index].seats--;

alert(

"✅ Registration Successful!\n\n"+

healthCamps[index].name

);

loadHealthCamps();

}

let feedbacks =
JSON.parse(localStorage.getItem("feedbacks")) || [];

function showFeedback(){

document.getElementById("confirmationPage").style.display="none";

document.getElementById("feedbackPage").style.display="block";

}

function submitFeedback(){

let feedback={

doctor:

document.getElementById("doctorRating").value,

hospital:

document.getElementById("hospitalRating").value,

waiting:

document.getElementById("waitingRating").value,

comment:

document.getElementById("feedbackComment").value,

patient:patient.name,

hospitalName:patient.hospital

};

feedbacks.push(feedback);

localStorage.setItem(

"feedbacks",

JSON.stringify(feedbacks)

);

alert("✅ Thank you for your feedback!");

goHome();

}

function loadFamily(){

let list=document.getElementById("familyList");

list.innerHTML="";

familyMembers.forEach(function(member){

list.innerHTML+=`

<div class="department-card"

onclick="selectFamily('${member}',this)">

👤 ${member}

</div>

`;

});

}

function selectFamily(name,element){

selectedFamilyMember=name;

let cards=document.getElementsByClassName("department-card");

for(let i=0;i<cards.length;i++){

cards[i].classList.remove("selectedDepartment");

}

element.classList.add("selectedDepartment");

}

function continueFamily(){

if(selectedFamilyMember==""){

alert("Please select a family member.");

return;

}

patient.familyMember=selectedFamilyMember;

document.getElementById("familyPage").style.display="none";

document.getElementById("villagePage").style.display="block";

}
