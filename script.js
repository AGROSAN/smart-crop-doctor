/* SMART CROP DOCTOR AI
   Put your Teachable Machine files in a folder named "model".
   Class names in Teachable Machine must be exactly:
   Healthy, Blast, BrownSpot, BLB, Unknown                      */

const MODEL_PATH = "model/";
const MIN_CONFIDENCE = 0.80;   // below this the result is "Uncertain" (test and adjust)
const LIVE_INTERVAL = 1500;    // milliseconds between live scans
const LIVE_AGREE = 3;          // live scans that must agree before showing a disease
const HISTORY_KEY = "scdHistory";

/* ---------- Interface words ---------- */
const TEXT = {
  en: {
    navHome: "Home", navScan: "Scanner", navLibrary: "Diseases", navHistory: "History", navHelp: "Help", navAbout: "About",
    title: "Smart Crop Disease Identification for Rural Farmers Using AI",
    intro: "Scan a paddy leaf with your phone to get a preliminary disease screening and basic guidance.",
    startScanning: "📷 Start Scanning",
    feat1: "Live camera scanning", feat2: "Photo upload from gallery", feat3: "Odia and English", feat4: "Scan history and report",
    disclaimer: "⚠️ This AI result is only a preliminary screening, not a confirmed diagnosis. Ask an agriculture expert before any treatment.",
    placeholder: "Press Start Camera or upload a leaf photo",
    tips: "Tip: Use one leaf, good daylight, a plain background, and hold the phone steady.",
    startCamera: "Start Camera", stopCamera: "Stop Camera", switchCamera: "Switch Camera",
    liveStart: "Start Live Scan", liveStop: "Stop Live Scan", capture: "📸 Capture & Scan", upload: "🖼️ Upload leaf photo",
    modelLoading: "Loading AI model…",
    modelReady: "✅ AI model is ready",
    modelMissing: "❌ AI model not loaded. Scanning is off. Check the internet and the 'model' folder.",
    modelLabels: "❌ Wrong class names in the model. Use: Healthy, Blast, BrownSpot, BLB, Unknown.",
    retry: "Try loading again",
    insecure: "Camera needs a secure website address starting with https://. You can upload a photo instead.",
    denied: "Camera permission was blocked. Tap the icon beside the website address, allow Camera, then reload. You can also upload a photo.",
    noCamera: "No camera was found. Please upload a photo.",
    cameraError: "The camera could not start. Close other camera apps and try again, or upload a photo.",
    badImage: "This file could not be read as a photo. Choose another photo.",
    scanError: "Scanning failed. Please try again.",
    analysing: "Analysing…",
    checking: "Hold steady. Checking the leaf…",
    result: "Result", confidence: "Model confidence", allScores: "Scores for all classes",
    confNote: "Confidence shows how strongly the model matches its training photos. It is not proof.",
    symptoms: "Possible visible symptoms", steps: "Suggested next steps",
    save: "Save to history", saved: "Saved ✅", download: "Download report",
    saveError: "This browser could not save the history.",
    historyNote: "History is stored only on this phone. Photos are not saved.",
    noHistory: "No saved scans yet.", clearHistory: "Delete all history", confirmClear: "Delete all saved scans?",
    date: "Date and time",
    observeTitle: "How to observe your crop",
    observe: "Walk through different parts of the field. Look at leaf colour, spot shape and leaf edges. Note how many plants are affected and whether it is spreading. Take clear photos.",
    expertTitle: "Ask an expert",
    expert: "Show the plant to your nearest Krishi Vigyan Kendra (KVK) or Block Agriculture Office. You can also call the Kisan Call Centre.",
    objTitle: "Objectives",
    objectives: "To help farmers notice possible paddy diseases early, give simple guidance in Odia and English, and encourage expert advice.",
    sciTitle: "Scientific principles",
    science: "A camera records light as pixels. A trained neural network finds visual patterns in the pixels and gives a score to each class.",
    techTitle: "Technology used", teamTitle: "Our team",
    team: "Student developers: Dinesh Chand and Abhijit Kamilia (Class VIII). Guide teacher: Abhay Prasad Giri. School: Umesh Chandra Govt. UP School, Odisha, India."
  },
  or: {
    navHome: "ମୂଳ ପୃଷ୍ଠା", navScan: "ସ୍କାନର୍", navLibrary: "ରୋଗ ସୂଚନା", navHistory: "ପୂର୍ବ ସ୍କାନ୍", navHelp: "ସହାୟତା", navAbout: "ପ୍ରକଳ୍ପ ବିଷୟରେ",
    title: "କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତା ଦ୍ୱାରା ଗ୍ରାମୀଣ ଚାଷୀଙ୍କ ପାଇଁ ଫସଲ ରୋଗ ଚିହ୍ନଟ",
    intro: "ଆପଣଙ୍କ ଫୋନ୍‌ରେ ଧାନ ପତ୍ର ସ୍କାନ୍ କରି ରୋଗର ପ୍ରାଥମିକ ଯାଞ୍ଚ ଓ ସାଧାରଣ ପରାମର୍ଶ ପାଆନ୍ତୁ।",
    startScanning: "📷 ସ୍କାନ୍ ଆରମ୍ଭ କରନ୍ତୁ",
    feat1: "କ୍ୟାମେରାରେ ସିଧାସଳଖ ସ୍କାନ୍", feat2: "ଗ୍ୟାଲେରୀରୁ ଫଟୋ ଦିଅନ୍ତୁ", feat3: "ଓଡ଼ିଆ ଓ ଇଂରାଜୀ", feat4: "ପୂର୍ବ ସ୍କାନ୍ ଓ ରିପୋର୍ଟ",
    disclaimer: "⚠️ ଏହି ଫଳାଫଳ କେବଳ ପ୍ରାଥମିକ ଯାଞ୍ଚ, ନିଶ୍ଚିତ ରୋଗ ନିର୍ଣ୍ଣୟ ନୁହେଁ। କୌଣସି ଚିକିତ୍ସା ପୂର୍ବରୁ କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।",
    placeholder: "କ୍ୟାମେରା ଚାଲୁ କରନ୍ତୁ କିମ୍ବା ପତ୍ରର ଫଟୋ ଦିଅନ୍ତୁ",
    tips: "ପରାମର୍ଶ: ଗୋଟିଏ ପତ୍ର ନିଅନ୍ତୁ, ଭଲ ଦିନ ଆଲୁଅ ଓ ସରଳ ପୃଷ୍ଠଭୂମି ରଖନ୍ତୁ, ଫୋନ୍ ସ୍ଥିର ଧରନ୍ତୁ।",
    startCamera: "କ୍ୟାମେରା ଚାଲୁ", stopCamera: "କ୍ୟାମେରା ବନ୍ଦ", switchCamera: "କ୍ୟାମେରା ବଦଳାନ୍ତୁ",
    liveStart: "ଲାଇଭ୍ ସ୍କାନ୍ ଆରମ୍ଭ", liveStop: "ଲାଇଭ୍ ସ୍କାନ୍ ବନ୍ଦ", capture: "📸 ଫଟୋ ନେଇ ସ୍କାନ୍ କରନ୍ତୁ", upload: "🖼️ ପତ୍ରର ଫଟୋ ଦିଅନ୍ତୁ",
    modelLoading: "AI ମଡେଲ୍ ଲୋଡ୍ ହେଉଛି…",
    modelReady: "✅ AI ମଡେଲ୍ ପ୍ରସ୍ତୁତ",
    modelMissing: "❌ AI ମଡେଲ୍ ଲୋଡ୍ ହୋଇନାହିଁ। ସ୍କାନ୍ ବନ୍ଦ ଅଛି। ଇଣ୍ଟରନେଟ୍ ଓ 'model' ଫୋଲ୍ଡର୍ ଯାଞ୍ଚ କରନ୍ତୁ।",
    modelLabels: "❌ ମଡେଲ୍‌ର ଶ୍ରେଣୀ ନାମ ଭୁଲ ଅଛି। ବ୍ୟବହାର କରନ୍ତୁ: Healthy, Blast, BrownSpot, BLB, Unknown.",
    retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
    insecure: "କ୍ୟାମେରା ପାଇଁ https:// ରୁ ଆରମ୍ଭ ହେଉଥିବା ସୁରକ୍ଷିତ ୱେବ୍‌ସାଇଟ୍ ଠିକଣା ଦରକାର। ଆପଣ ଫଟୋ ମଧ୍ୟ ଦେଇପାରିବେ।",
    denied: "କ୍ୟାମେରା ଅନୁମତି ବନ୍ଦ ଅଛି। ୱେବ୍‌ସାଇଟ୍ ଠିକଣା ପାଖରେ ଥିବା ଚିହ୍ନ ଦବାଇ କ୍ୟାମେରା ଅନୁମତି ଦିଅନ୍ତୁ, ତା'ପରେ ପୃଷ୍ଠା ପୁଣି ଖୋଲନ୍ତୁ। ଆପଣ ଫଟୋ ମଧ୍ୟ ଦେଇପାରିବେ।",
    noCamera: "କ୍ୟାମେରା ମିଳିଲା ନାହିଁ। ଦୟାକରି ଫଟୋ ଦିଅନ୍ତୁ।",
    cameraError: "କ୍ୟାମେରା ଚାଲୁ ହେଲା ନାହିଁ। ଅନ୍ୟ କ୍ୟାମେରା ଆପ୍ ବନ୍ଦ କରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ, କିମ୍ବା ଫଟୋ ଦିଅନ୍ତୁ।",
    badImage: "ଏହି ଫାଇଲ୍‌କୁ ଫଟୋ ଭାବେ ପଢ଼ିହେଲା ନାହିଁ। ଅନ୍ୟ ଫଟୋ ବାଛନ୍ତୁ।",
    scanError: "ସ୍କାନ୍ ହୋଇପାରିଲା ନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    analysing: "ବିଶ୍ଳେଷଣ ଚାଲିଛି…",
    checking: "ଫୋନ୍ ସ୍ଥିର ରଖନ୍ତୁ। ପତ୍ର ଯାଞ୍ଚ ହେଉଛି…",
    result: "ଫଳାଫଳ", confidence: "ମଡେଲ୍‌ର ଆତ୍ମବିଶ୍ୱାସ", allScores: "ସମସ୍ତ ଶ୍ରେଣୀର ସ୍କୋର୍",
    confNote: "ଏହି ସ୍କୋର୍ ତାଲିମ ଫଟୋ ସହ କେତେ ମେଳ ଖାଉଛି ତାହା ଦେଖାଏ। ଏହା ପ୍ରମାଣ ନୁହେଁ।",
    symptoms: "ସମ୍ଭାବ୍ୟ ଲକ୍ଷଣ", steps: "ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
    save: "ସଂରକ୍ଷଣ କରନ୍ତୁ", saved: "ସଂରକ୍ଷିତ ✅", download: "ରିପୋର୍ଟ ଡାଉନଲୋଡ୍",
    saveError: "ଏହି ବ୍ରାଉଜର୍ ସଂରକ୍ଷଣ କରିପାରିଲା ନାହିଁ।",
    historyNote: "ପୂର୍ବ ସ୍କାନ୍ କେବଳ ଏହି ଫୋନ୍‌ରେ ରହେ। ଫଟୋ ସଂରକ୍ଷଣ ହୁଏ ନାହିଁ।",
    noHistory: "କୌଣସି ସଂରକ୍ଷିତ ସ୍କାନ୍ ନାହିଁ।", clearHistory: "ସବୁ ପୂର୍ବ ସ୍କାନ୍ ଲିଭାନ୍ତୁ", confirmClear: "ସବୁ ସଂରକ୍ଷିତ ସ୍କାନ୍ ଲିଭାଇବେ?",
    date: "ତାରିଖ ଓ ସମୟ",
    observeTitle: "ଫସଲ କିପରି ଦେଖିବେ",
    observe: "କ୍ଷେତର ବିଭିନ୍ନ ସ୍ଥାନ ବୁଲି ଦେଖନ୍ତୁ। ପତ୍ରର ରଙ୍ଗ, ଦାଗର ଆକାର ଓ ପତ୍ରର ଧାର ଦେଖନ୍ତୁ। କେତେ ଗଛ ଆକ୍ରାନ୍ତ ଏବଂ ରୋଗ ବ୍ୟାପୁଛି କି ନାହିଁ ଲେଖି ରଖନ୍ତୁ। ସ୍ପଷ୍ଟ ଫଟୋ ନିଅନ୍ତୁ।",
    expertTitle: "ବିଶେଷଜ୍ଞଙ୍କ ପରାମର୍ଶ",
    expert: "ନିକଟସ୍ଥ କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK) କିମ୍ବା ବ୍ଲକ୍ କୃଷି କାର୍ଯ୍ୟାଳୟରେ ଗଛ ଦେଖାନ୍ତୁ। କିଷାନ୍ କଲ୍ ସେଣ୍ଟରକୁ ମଧ୍ୟ ଫୋନ୍ କରିପାରିବେ।",
    objTitle: "ଉଦ୍ଦେଶ୍ୟ",
    objectives: "ଚାଷୀଙ୍କୁ ଧାନର ସମ୍ଭାବ୍ୟ ରୋଗ ଶୀଘ୍ର ଜାଣିବାରେ ସାହାଯ୍ୟ କରିବା, ଓଡ଼ିଆ ଓ ଇଂରାଜୀରେ ସରଳ ପରାମର୍ଶ ଦେବା ଏବଂ ବିଶେଷଜ୍ଞଙ୍କ ସହାୟତା ନେବାକୁ ଉତ୍ସାହିତ କରିବା।",
    sciTitle: "ବୈଜ୍ଞାନିକ ନୀତି",
    science: "କ୍ୟାମେରା ଆଲୋକକୁ ପିକ୍ସେଲ୍ ଭାବେ ଧରେ। ତାଲିମପ୍ରାପ୍ତ ନ୍ୟୁରାଲ୍ ନେଟୱାର୍କ ସେଥିରୁ ଦୃଶ୍ୟ ଢାଞ୍ଚା ଚିହ୍ନି ପ୍ରତ୍ୟେକ ଶ୍ରେଣୀକୁ ସ୍କୋର୍ ଦିଏ।",
    techTitle: "ବ୍ୟବହୃତ ପ୍ରଯୁକ୍ତି", teamTitle: "ଆମ ଦଳ",
    team: "ଛାତ୍ର ବିକାଶକ: ଦୀନେଶ ଚାନ୍ଦ ଓ ଅଭିଜିତ କାମିଲା (ଅଷ୍ଟମ ଶ୍ରେଣୀ)। ମାର୍ଗଦର୍ଶକ ଶିକ୍ଷକ: ଅଭୟ ପ୍ରସାଦ ଗିରି। ବିଦ୍ୟାଳୟ: ଉମେଶ ଚନ୍ଦ୍ର ସରକାରୀ ଉଚ୍ଚ ପ୍ରାଥମିକ ବିଦ୍ୟାଳୟ, ଓଡ଼ିଶା, ଭାରତ।"
  }
};

/* ---------- Disease facts (non-chemical guidance only) ----------
   Sources: Pacific Pests, Pathogens & Weeds fact sheets 252, 427, 418 */
const DISEASES = {
  healthy: {
    en: { name: "Healthy Paddy Leaf",
      symptoms: ["Even green colour", "No clear spots, streaks or drying edges"],
      steps: ["Keep checking the field regularly", "Apply fertiliser only at recommended rates", "Keep the field free of weeds", "One healthy leaf does not prove the whole field is healthy"] },
    or: { name: "ସୁସ୍ଥ ଧାନ ପତ୍ର",
      symptoms: ["ସମାନ ସବୁଜ ରଙ୍ଗ", "ସ୍ପଷ୍ଟ ଦାଗ, ଧାରି କିମ୍ବା ଶୁଖିଲା ଧାର ନାହିଁ"],
      steps: ["ନିୟମିତ କ୍ଷେତ ଯାଞ୍ଚ କରନ୍ତୁ", "ସୁପାରିଶ ମାତ୍ରାରେ ହିଁ ସାର ଦିଅନ୍ତୁ", "କ୍ଷେତକୁ ଅନାବନା ଘାସମୁକ୍ତ ରଖନ୍ତୁ", "ଗୋଟିଏ ସୁସ୍ଥ ପତ୍ର ପୂରା କ୍ଷେତ ସୁସ୍ଥ ବୋଲି ପ୍ରମାଣ କରେ ନାହିଁ"] }
  },
  blast: {
    en: { name: "Rice Blast",
      symptoms: ["Oval or diamond-shaped spots on leaves", "Whitish-grey centres with dark or reddish-brown borders", "Spots may join and dry the leaf", "The neck below the grain head may also rot"],
      steps: ["Show the plant to an agriculture expert soon", "Split nitrogen fertiliser into 2 or 3 doses", "Avoid water stress and very close planting", "After harvest, bury crop remains (ask locally about safe disposal)", "Next season, ask about resistant varieties"] },
    or: { name: "ଧାନ ବ୍ଲାଷ୍ଟ ରୋଗ",
      symptoms: ["ପତ୍ରରେ ଅଣ୍ଡାକାର କିମ୍ବା ଡଙ୍ଗା ଆକୃତିର ଦାଗ", "ଦାଗର ମଝି ଧଳା-ପାଉଁଶିଆ ଓ ଧାର ଗାଢ଼ କିମ୍ବା ନାଲି-ବାଦାମୀ", "ଦାଗଗୁଡ଼ିକ ମିଶି ପତ୍ର ଶୁଖାଇପାରେ", "କେଣ୍ଡା ତଳ ବେକ ଅଂଶ ମଧ୍ୟ ସଢ଼ିପାରେ"],
      steps: ["ଶୀଘ୍ର କୃଷି ବିଶେଷଜ୍ଞଙ୍କୁ ଗଛ ଦେଖାନ୍ତୁ", "ଯବକ୍ଷାରଜାନ ସାର ୨ କିମ୍ବା ୩ ଥରରେ ଭାଗ କରି ଦିଅନ୍ତୁ", "ପାଣି ଅଭାବ ଓ ଅତି ଘନ ରୋପଣ ଏଡ଼ାନ୍ତୁ", "ଅମଳ ପରେ ଫସଲ ଅବଶେଷ ମାଟିରେ ପୋତନ୍ତୁ (ସୁରକ୍ଷିତ ଉପାୟ ପଚାରନ୍ତୁ)", "ପରବର୍ତ୍ତୀ ଋତୁ ପାଇଁ ରୋଗ ସହଣୀ କିସମ ବିଷୟରେ ପଚାରନ୍ତୁ"] }
  },
  brownspot: {
    en: { name: "Brown Spot",
      symptoms: ["Round or oval dark brown spots", "Older spots have grey or light brown centres with dark brown edges", "Grains may also get spots"],
      steps: ["Ask an expert to confirm; it can look like blast", "Get the soil tested; poor nutrition is linked with this disease", "Apply fertiliser at recommended rates", "Use clean, healthy seed; ask about hot-water seed treatment", "After harvest, plough crop remains into the soil"] },
    or: { name: "ବାଦାମୀ ଦାଗ ରୋଗ",
      symptoms: ["ଗୋଲ କିମ୍ବା ଅଣ୍ଡାକାର ଗାଢ଼ ବାଦାମୀ ଦାଗ", "ପୁରୁଣା ଦାଗର ମଝି ପାଉଁଶିଆ ବା ହାଲୁକା ବାଦାମୀ ଓ ଧାର ଗାଢ଼ ବାଦାମୀ", "ଧାନ ଦାନାରେ ମଧ୍ୟ ଦାଗ ହୋଇପାରେ"],
      steps: ["ବିଶେଷଜ୍ଞଙ୍କଠାରୁ ନିଶ୍ଚିତ କରନ୍ତୁ; ଏହା ବ୍ଲାଷ୍ଟ ପରି ଦେଖାଯାଇପାରେ", "ମାଟି ପରୀକ୍ଷା କରନ୍ତୁ; ପୋଷକ ଅଭାବ ସହ ଏହି ରୋଗର ସମ୍ପର୍କ ଅଛି", "ସୁପାରିଶ ମାତ୍ରାରେ ସାର ଦିଅନ୍ତୁ", "ସଫା ଓ ସୁସ୍ଥ ବିହନ ବ୍ୟବହାର କରନ୍ତୁ; ଗରମ ପାଣି ବିହନ ବିଶୋଧନ ବିଷୟରେ ପଚାରନ୍ତୁ", "ଅମଳ ପରେ ଫସଲ ଅବଶେଷ ହଳ କରି ମାଟିରେ ମିଶାନ୍ତୁ"] }
  },
  blb: {
    en: { name: "Bacterial Leaf Blight",
      symptoms: ["Pale yellow streaks from the leaf tip or edges downward", "Wavy streak margins", "Leaves turn yellowish-white, wilt and dry", "Small milky drops may appear on streaks"],
      steps: ["Show the plant to an agriculture expert soon", "Avoid too much nitrogen fertiliser", "Drain the field well; floodwater spreads the disease", "Remove weeds and do not clip or damage seedlings", "Do not save seed from affected plants; ask about resistant varieties"] },
    or: { name: "ଜୀବାଣୁଜନିତ ପତ୍ରପୋଡ଼ା ରୋଗ",
      symptoms: ["ପତ୍ର ଅଗ ବା ଧାରରୁ ତଳକୁ ଫିକା ହଳଦିଆ ଧାରି", "ଧାରିର କଡ଼ ଢେଉ ପରି", "ପତ୍ର ହଳଦିଆ-ଧଳା ହୋଇ ଝାଉଁଳି ଶୁଖିଯାଏ", "ଧାରି ଉପରେ କ୍ଷୀର ପରି ଛୋଟ ବୁନ୍ଦା ଦେଖାଯାଇପାରେ"],
      steps: ["ଶୀଘ୍ର କୃଷି ବିଶେଷଜ୍ଞଙ୍କୁ ଗଛ ଦେଖାନ୍ତୁ", "ଅତ୍ୟଧିକ ଯବକ୍ଷାରଜାନ ସାର ଦିଅନ୍ତୁ ନାହିଁ", "କ୍ଷେତରୁ ପାଣି ନିଷ୍କାସନ କରନ୍ତୁ; ବନ୍ୟା ପାଣି ରୋଗ ବ୍ୟାପାଏ", "ଅନାବନା ଘାସ ହଟାନ୍ତୁ ଓ ତଳି ଗଛକୁ କାଟନ୍ତୁ ବା ନଷ୍ଟ କରନ୍ତୁ ନାହିଁ", "ଆକ୍ରାନ୍ତ ଗଛରୁ ବିହନ ରଖନ୍ତୁ ନାହିଁ; ସହଣୀ କିସମ ବିଷୟରେ ପଚାରନ୍ତୁ"] }
  },
  unknown: {
    en: { name: "Unknown / Uncertain",
      symptoms: ["The AI cannot give a reliable answer for this picture"],
      steps: ["Retake a clear photo of one paddy leaf in daylight", "If the problem continues, ask an agriculture expert", "Do not apply any treatment based on this result"] },
    or: { name: "ଅଜଣା / ଅନିଶ୍ଚିତ",
      symptoms: ["ଏହି ଫଟୋ ପାଇଁ AI ଭରସାଯୋଗ୍ୟ ଉତ୍ତର ଦେଇପାରୁନାହିଁ"],
      steps: ["ଦିନ ଆଲୁଅରେ ଗୋଟିଏ ଧାନ ପତ୍ରର ସ୍ପଷ୍ଟ ଫଟୋ ପୁଣି ନିଅନ୍ତୁ", "ସମସ୍ୟା ରହିଲେ କୃଷି ବିଶେଷଜ୍ଞଙ୍କୁ ପଚାରନ୍ତୁ", "ଏହି ଫଳାଫଳ ଆଧାରରେ କୌଣସି ଚିକିତ୍ସା କରନ୍ତୁ ନାହିଁ"] }
  }
};

/* ---------- App memory ---------- */
const $ = (id) => document.getElementById(id);
let lang = "or";
let model = null;
let modelState = "modelLoading";
let stream = null;
let facing = "environment";   // rear camera
let cameraRequest = 0;
let liveOn = false;
let liveTimer = null;
let busy = false;
let scanId = 0;               // used to ignore old results
let recent = [];
let current = null;           // result shown on screen
let messageKey = "";

const t = (key) => TEXT[lang][key];

// Creates a page element safely (text is never treated as code)
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function list(items) {
  const ul = el("ul");
  items.forEach((item) => ul.appendChild(el("li", item)));
  return ul;
}
function setMessage(key, isError) {
  messageKey = key;
  $("message").textContent = key ? t(key) : "";
  $("message").className = isError ? "status error" : "status";
}

/* ---------- Pages and language ---------- */
function showPage(name) {
  document.querySelectorAll(".page").forEach((p) => p.classList.toggle("show", p.id === name));
  document.querySelectorAll("nav button").forEach((b) => b.classList.toggle("active", b.dataset.page === name));
  if (name !== "scan") stopCamera();
  if (name === "history") renderHistory();
  window.scrollTo(0, 0);
}

function applyLanguage() {
  document.documentElement.lang = lang;
  $("langBtn").textContent = lang === "or" ? "English" : "ଓଡ଼ିଆ";
  document.querySelectorAll("[data-t]").forEach((n) => { n.textContent = t(n.dataset.t); });
  $("liveBtn").textContent = t(liveOn ? "liveStop" : "liveStart");
  $("modelStatus").textContent = t(modelState);
  setMessage(messageKey, $("message").classList.contains("error"));
  renderResult();
  renderLibrary();
  renderHistory();
}

/* ---------- AI model ---------- */
// "Brown Spot", "brown_spot" and "BrownSpot" all become "brownspot"
const toKey = (label) => label.toLowerCase().replace(/[^a-z]/g, "");

async function loadModel() {
  modelState = "modelLoading";
  $("modelStatus").textContent = t(modelState);
  $("modelStatus").className = "status";
  $("retryBtn").hidden = true;
  try {
    if (!window.tmImage) throw new Error("AI library not loaded");
    const loaded = await tmImage.load(MODEL_PATH + "model.json", MODEL_PATH + "metadata.json");
    const keys = loaded.getClassLabels().map(toKey).sort().join();
    if (keys !== Object.keys(DISEASES).sort().join()) {
      modelState = "modelLabels";
    } else {
      model = loaded;
      modelState = "modelReady";
    }
  } catch (error) {
    console.error(error);
    modelState = "modelMissing";
  }
  $("modelStatus").textContent = t(modelState);
  $("modelStatus").className = model ? "status" : "status error";
  // If a library failed to download, only a page reload can fetch it again
  $("retryBtn").hidden = Boolean(model);
  updateButtons();
}

function updateButtons() {
  const cameraOn = Boolean(stream);
  $("startBtn").disabled = cameraOn;
  $("stopBtn").disabled = !cameraOn;
  $("switchBtn").disabled = !cameraOn;
  $("liveBtn").disabled = !(cameraOn && model);
  $("captureBtn").disabled = !(cameraOn && model) || liveOn;
  $("fileInput").disabled = !model;
}

/* ---------- Camera ---------- */
async function startCamera() {
  stopCamera();
  const request = cameraRequest;
  clearResult();
  setMessage("");
  if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setMessage("insecure", true);
    return;
  }
  $("startBtn").disabled = true;
  try {
    const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facing } }, audio: false });
    // The user may have left the page while the permission box was open
    if (request !== cameraRequest) { newStream.getTracks().forEach((track) => track.stop()); return; }
    stream = newStream;
    $("video").srcObject = stream;
    $("video").hidden = false;
    $("preview").hidden = true;
    $("placeholder").hidden = true;
    $("frame").hidden = false;
    await $("video").play();
  } catch (error) {
    if (request !== cameraRequest) return;
    stopCamera();
    if (error.name === "NotAllowedError" || error.name === "SecurityError") setMessage("denied", true);
    else if (error.name === "NotFoundError") setMessage("noCamera", true);
    else setMessage("cameraError", true);
  }
  updateButtons();
}

function stopCamera() {
  cameraRequest++;
  stopLive();
  if (stream) stream.getTracks().forEach((track) => track.stop());
  stream = null;
  $("video").srcObject = null;
  $("video").hidden = true;
  $("frame").hidden = true;
  $("placeholder").hidden = !$("preview").hidden;
  updateButtons();
}

/* ---------- Scanning ---------- */
// Copy the centre square of a photo or video frame onto the 224 x 224 canvas
function drawSquare(source, width, height, canvas) {
  const side = Math.min(width, height);
  canvas.getContext("2d").drawImage(source, (width - side) / 2, (height - side) / 2, side, side, 0, 0, 224, 224);
}

async function analyse(canvas) {
  const predictions = await model.predict(canvas);
  const scores = predictions
    .map((p) => ({ key: toKey(p.className), value: p.probability }))
    .sort((a, b) => b.value - a.value);
  const top = scores[0];
  const reliable = top.key !== "unknown" && top.value >= MIN_CONFIDENCE;
  return { key: reliable ? top.key : "unknown", confidence: top.value, topKey: top.key, scores, date: new Date().toISOString() };
}

async function scanCanvas(canvas) {
  const id = ++scanId;
  current = null;
  renderResult();
  setMessage("analysing");
  try {
    const result = await analyse(canvas);
    if (id !== scanId) return;
    current = result;
    setMessage("");
    renderResult();
    $("result").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error(error);
    if (id === scanId) setMessage("scanError", true);
  }
}

function capture() {
  const video = $("video");
  if (!model || !video.videoWidth) return;
  drawSquare(video, video.videoWidth, video.videoHeight, $("preview"));
  $("preview").hidden = false;
  stopCamera();
  scanCanvas($("preview"));
}

function uploadPhoto(event) {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file || !model) return;
  stopCamera();
  clearResult();
  const id = scanId;
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    URL.revokeObjectURL(url);
    if (id !== scanId) return;
    drawSquare(image, image.naturalWidth, image.naturalHeight, $("preview"));
    $("preview").hidden = false;
    $("placeholder").hidden = true;
    scanCanvas($("preview"));
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    setMessage("badImage", true);
  };
  image.src = url;
}

function startLive() {
  if (!model || !stream) return;
  clearResult();
  liveOn = true;
  recent = [];
  $("frame").classList.add("scanning");
  $("liveBtn").textContent = t("liveStop");
  setMessage("checking");
  updateButtons();
  liveStep(scanId);
}

async function liveStep(session) {
  if (!liveOn || session !== scanId) return;
  const video = $("video");
  if (!busy && video.videoWidth) {
    busy = true;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 224;
      drawSquare(video, video.videoWidth, video.videoHeight, canvas);
      const result = await analyse(canvas);
      if (liveOn && session === scanId) {
        recent = recent.concat(result.key).slice(-LIVE_AGREE);
        // Show a result only when the last few frames agree
        if (recent.length === LIVE_AGREE) {
          const agree = recent.every((key) => key === recent[0]);
          if (!agree) result.key = "unknown";
          current = result;
          setMessage("");
          renderResult();
        }
      }
    } catch (error) {
      console.error(error);
      stopLive();
      setMessage("scanError", true);
    }
    busy = false;
  }
  if (liveOn && session === scanId) liveTimer = setTimeout(() => liveStep(session), LIVE_INTERVAL);
}

function stopLive() {
  clearTimeout(liveTimer);
  if (liveOn) {
    liveOn = false;
    scanId++;
    if (messageKey === "checking") setMessage("");
  }
  $("frame").classList.remove("scanning");
  $("liveBtn").textContent = t("liveStart");
  updateButtons();
}

/* ---------- Result ---------- */
function clearResult() {
  scanId++;
  current = null;
  $("preview").hidden = true;
  $("placeholder").hidden = Boolean(stream);
  renderResult();
}

function percent(value) { return (value * 100).toFixed(1) + "%"; }

function renderResult() {
  const box = $("result");
  box.replaceChildren();
  box.hidden = !current;
  if (!current) return;
  const info = DISEASES[current.key];
  const other = lang === "or" ? "en" : "or";

  box.appendChild(el("h2", t("result") + ": " + info[lang].name));
  box.appendChild(el("p", info[other].name));
  box.appendChild(el("p", t("confidence") + " (" + DISEASES[current.topKey][lang].name + "): " + percent(current.confidence), "status"));
  box.appendChild(el("p", t("confNote")));

  box.appendChild(el("h3", t("symptoms")));
  box.appendChild(list(info[lang].symptoms));
  box.appendChild(el("h3", t("steps")));
  box.appendChild(list(info[lang].steps));
  box.appendChild(el("p", t("disclaimer"), "warn"));

  box.appendChild(el("h3", t("allScores")));
  current.scores.forEach((score) => {
    box.appendChild(el("div", DISEASES[score.key][lang].name + " — " + percent(score.value)));
    const bar = el("div", undefined, "bar");
    const fill = el("div");
    fill.style.width = percent(score.value);
    bar.appendChild(fill);
    box.appendChild(bar);
  });

  const shown = current;
  const buttons = el("p", undefined, "buttons");
  const save = el("button", t(shown.saved ? "saved" : "save"));
  save.disabled = Boolean(shown.saved);
  save.onclick = () => saveScan(shown);
  const download = el("button", t("download"));
  download.onclick = () => downloadReport(shown);
  buttons.append(save, download);
  box.appendChild(buttons);
}

/* ---------- History and report ---------- */
function readHistory() {
  try {
    const data = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(data) ? data.filter((r) => r && DISEASES[r.key] && DISEASES[r.topKey]) : [];
  } catch (error) { return []; }
}

function saveScan(result) {
  try {
    const record = { key: result.key, topKey: result.topKey, confidence: result.confidence, date: result.date };
    localStorage.setItem(HISTORY_KEY, JSON.stringify([record, ...readHistory()].slice(0, 50)));
    result.saved = true;
    // Saving during live scan pauses it so the result stays on screen
    if (liveOn) { current = result; stopLive(); }
    renderResult();
  } catch (error) { setMessage("saveError", true); }
}

function downloadReport(result) {
  const info = DISEASES[result.key][lang];
  const items = (array) => "<ul>" + array.map((x) => "<li>" + x + "</li>").join("") + "</ul>";
  const html = '<!DOCTYPE html><html lang="' + lang + '"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"><title>Scan Report</title></head>' +
    '<body style="font-family:sans-serif;max-width:600px;margin:auto;padding:16px">' +
    "<h1>SMART CROP DOCTOR AI</h1>" +
    "<p>" + t("date") + ": " + new Date(result.date).toLocaleString("en-IN") + "</p>" +
    "<h2>" + t("result") + ": " + info.name + "</h2>" +
    "<p>" + t("confidence") + " (" + DISEASES[result.topKey][lang].name + "): " + percent(result.confidence) + "</p>" +
    "<h3>" + t("symptoms") + "</h3>" + items(info.symptoms) +
    "<h3>" + t("steps") + "</h3>" + items(info.steps) +
    "<p><b>" + t("disclaimer") + "</b></p><p>Kisan Call Centre: 1800-180-1551</p></body></html>";
  const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
  const link = el("a");
  link.href = url;
  link.download = "crop-report-" + result.date.slice(0, 19).replace(/:/g, "-") + ".html";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function renderHistory() {
  const box = $("historyList");
  box.replaceChildren();
  const records = readHistory();
  if (!records.length) box.appendChild(el("p", t("noHistory")));
  records.forEach((record) => {
    const card = el("div", undefined, "card");
    card.appendChild(el("h3", DISEASES[record.key][lang].name));
    card.appendChild(el("p", new Date(record.date).toLocaleString("en-IN")));
    card.appendChild(el("p", t("confidence") + " (" + DISEASES[record.topKey][lang].name + "): " + percent(record.confidence)));
    const button = el("button", t("download"));
    button.onclick = () => downloadReport(record);
    card.appendChild(button);
    box.appendChild(card);
  });
}

function renderLibrary() {
  const box = $("libraryList");
  box.replaceChildren();
  ["healthy", "blast", "brownspot", "blb"].forEach((key) => {
    const info = DISEASES[key][lang];
    const card = el("div", undefined, "card");
    card.append(el("h3", info.name), el("b", t("symptoms")), list(info.symptoms), el("b", t("steps")), list(info.steps));
    box.appendChild(card);
  });
}

/* ---------- Buttons ---------- */
document.querySelectorAll("[data-page]").forEach((b) => b.addEventListener("click", () => showPage(b.dataset.page)));
$("langBtn").onclick = () => { lang = lang === "or" ? "en" : "or"; applyLanguage(); };
$("startBtn").onclick = startCamera;
$("stopBtn").onclick = stopCamera;
$("switchBtn").onclick = () => { facing = facing === "environment" ? "user" : "environment"; startCamera(); };
$("liveBtn").onclick = () => (liveOn ? stopLive() : startLive());
$("captureBtn").onclick = capture;
$("fileInput").onchange = uploadPhoto;
$("retryBtn").onclick = () => (window.tmImage ? loadModel() : location.reload());
$("clearBtn").onclick = () => {
  if (!confirm(t("confirmClear"))) return;
  try { localStorage.removeItem(HISTORY_KEY); } catch (error) { setMessage("saveError", true); }
  renderHistory();
};
document.addEventListener("visibilitychange", () => { if (document.hidden) stopCamera(); });

applyLanguage();
showPage("home");
loadModel();
