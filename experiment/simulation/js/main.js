// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    Dom.hideAll()
  }
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}
   
// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    
box_img : new Dom("box_img"),
component_battery : new Dom("component_battery"),
component_capacitor : new Dom("component_capacitor"),
component_diode : new Dom("component_diode"),
component_inductor : new Dom("component_inductor"),
component_mosfet : new Dom("component_mosfet"),
component_register : new Dom("component_register"),
full_circuit : new Dom("full_circuit"),
full_circuit2 : new Dom("full_circuit2"),
circuit_full_2 : new Dom("circuit_full_2"),
circuit_full_3 : new Dom("circuit_full_3"),
graph_arrow : new Dom("part_3_graph_arrow"),
part_3_option_1 : new Dom("part_3_option_1"),
part_3_option_2 : new Dom("part_3_option_2"),
part_3_option_3 : new Dom("part_3_option_3"),
part_3_option_4 : new Dom("part_3_option_4"),
record_btn : new Dom("record_btn"),
part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_C : new Dom(".slider_C"),
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_1 : new Dom("part_2_graph_1"),
part_2_graph_2 : new Dom("part_2_graph_2"),
part_2_graph_3 : new Dom("part_2_graph_3"),
run_btn : new Dom("run_btn"),
slider_box : new Dom(".slider-box"),
right_tick_1 : new Dom("right_tick_1"),
right_tick_2 : new Dom("right_tick_2"),
right_tick_3: new Dom("right_tick_3"),
right_tick_4 : new Dom("right_tick_4"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),
graph1_arrow : new Dom("graph1_arrow"),
graph2_arrow : new Dom("graph2_arrow"),
part_2_graph_empty : new Dom("part_2_graph_empty"),
part_3_option_4_graph : new Dom("part_3_option_4_graph"),
btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),
btn_record : new Dom(".btn-record"),
btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

btn_transparent: new Dom(".btn-transparent"),
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),
part_3_option_select : new Dom("part_3_option_select"),
part_1_text_for_crrct: new Dom("part_1_text_for_crrct"),
part_1_text_for_wrong: new Dom("part_1_text_for_wrong"),

// EE7 images added


new_box1 : new Dom("new_box1"),
new_box2 : new Dom("new_box2"),
new_box3 : new Dom("new_box3"),
new_box4 : new Dom("new_box4"),
new_box5 : new Dom("new_box5"),
new_box6 : new Dom("new_box6"),
new_box_img : new Dom("new_box_img"),
new_component_capacitor : new Dom("new_component_capacitor"),
new_component_diode : new Dom("new_component_diode"),
new_component_mosfet : new Dom("new_component_mosfet"),
new_component_resistance : new Dom("new_component_resistance"),
new_component_transformer : new Dom("new_component_transformer"),
new_component_voltage : new Dom("new_component_voltage"),
new_part_1_circuit_full : new Dom("new_part_1_circuit_full"),
new_part_2_circuit_full : new Dom("new_part_2_circuit_full"),
new_part_2_graph_1 : new Dom("new_part_2_graph_1"),
new_part_2_graph_2 : new Dom("new_part_2_graph_2"),
new_part_2_graph_3 : new Dom("new_part_2_graph_3"),
new_part_3_4_circuit : new Dom("new_part_3_4_circuit"),
new_part_3_4_ratings : new Dom("new_part_3_4_ratings"),
new_part_3_circuit : new Dom("new_part_3_circuit"),
new_part_3_select_option_1 : new Dom("new_part_3_select_option_1"),
new_part_3_select_option_2 : new Dom("new_part_3_select_option_2"),
new_part_3_select_option_3 : new Dom("new_part_3_select_option_3"),
new_part_3_select_option_4 : new Dom("new_part_3_select_option_4"),
new_part_3_select_option_full : new Dom("new_part_3_select_option_full"),


//EE3 img added
box1 : new Dom("box1"),
box2 : new Dom("box2"),
box3 : new Dom("box3"),
box4 : new Dom("box4"),
box5 : new Dom("box5"),
box6 : new Dom("box6"),
part1_circuit : new Dom("part1_circuit"),
part1_component_capacitor : new Dom("part1_component_capacitor"),
part1_component_diode : new Dom("part1_component_diode"),
part1_component_inductor : new Dom("part1_component_inductor"),
part1_component_mosfet : new Dom("part1_component_mosfet"),
part1_component_resistance : new Dom("part1_component_resistance"),
part1_component_voltage : new Dom("part1_component_voltage"),
part_3_option_5 : new Dom("part_3_option_5"),

part1_crrct_text : new Dom("part1_crrct_text"),
part1_incrrct_text : new Dom("part1_incrrct_text"),
part1_crrct_circuit : new Dom("part1_crrct_circuit"),
ee3_btn_check : new Dom(".ee3-btn-check"),
ee3_btn_reset : new Dom(".ee3-btn-reset"),
ee3_btn_hint : new Dom(".ee3-btn-hint"),
part4_table_graph : new Dom("part4_table_graph"),

//ee3 symbol imgs added

symbol_vIn : new Dom("symbol_vIn"),
symbol_L : new Dom("symbol_L"),
symbol_C : new Dom("symbol_C"),
symbol_S : new Dom("symbol_S"),
symbol_D : new Dom("symbol_D"),
symbol_R : new Dom("symbol_R"),

part_2_graph_data_upper: new Dom("part_2_graph_data_upper"),

concept_development : new Dom(".concept_development"),

// EE3 dom items added

part1_box1 : new Dom(".part1_box1"),




     
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


 //! to change header
 experiment_heading: new Dom(".experiment_heading"),

 chart: [
  graph1=null,
  graph2=null,
  graph3=null,
  graph4=null,
  graph5=null,
  graph6=null,
  graph7=null,
<<<<<<< Updated upstream
=======
  graph8=null,
  graph9=null,
  graph10=null,
>>>>>>> Stashed changes
 ],

 chart: {
  label1:{
    x: "Label 2",
    y: "Label 1",
  },
  label2:{
    x: "Label 2",
    y: "Label 1",
  },
  label3:{
    x: "Label 2",
    y: "Label 1",
  },
  label4:{
    x: "Label 2",
    y: "Label 1",
  },
  label5:{
    x: "Label 2",
    y: "Label 1",
  },
  label6:{
    x: "Label 2",
    y: "Label 1",
  },
  label7:{
    x: "Label 2",
    y: "Label 1",
  },
<<<<<<< Updated upstream
=======
  label8:{
    x: "Label 2",
    y: "Label 1",
  },
  label9:{
    x: "Label 2",
    y: "Label 1",
  },
  label10:{
    x: "Label 2",
    y: "Label 1",
  },
>>>>>>> Stashed changes
 } 



  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },

  changeHeader(step){
    let heading = Scenes.items.experiment_heading
    switch(step){
      case 1: heading.setContent("Ideal-Characteristics")
      break;
      case 2: heading.setContent("Non-Ideal-Characteristics")
      break;
      case 3: heading.setContent("Losses And Efficiency")
      break;
      case 4: heading.setContent("Component Stress")
      break;
    }
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),
    (objective = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().zIndex(6000).item;

      Scenes.items.concept_development.set().styles({
        zIndex: "5000",
        scale: "0.98 0.914",
        top: "-144px",
        position: "absolute",
      })

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),  
    // (step1 = function () {
    //   setIsProcessRunning(true)
    //   // to hide previous step
    //   Dom.hideAll()
    //   Scenes.items.projectIntro.hide()
    //   Dom.setBlinkArrow(-1)
    //   Dom.setBlinkArrowRed(-1)
    //   Scenes.items.btn_next.show()
    //   Scenes.items.slider_box.hide()

    //   Scenes.setStepHeading("Step-1", "Circuit Formulation");

    //   // temp text load source
    //   let st = {
    //     color: "red",
    //     fontSize: "20px",
    //   }
    //   let st2 = {
    //     width: "250px",
    //     fontSize: "20px",
    //     color: "red",
    //     textAlign: "center",
    //     backgroundColor: "white",
    //     padding: "10px",
    //     borderRadius: "12px"
    //   }
    //   // ! Show Text
    //   let textSelectBox = 'Select the "box"'
    //   let textSelectComponent = 'Select the "component" to be placed in the box'
    //   Scenes.items.tempTitle17.set(675,320).setContent("Load").styles(st)
    //   Scenes.items.tempTitle18.set(25,270).setContent("Source").styles(st)

    //   let frontText = Scenes.items.tempTitle19.set(680).setContent(textSelectBox).styles(st2)
    //   Anime.fadeIn(frontText.item,0.5)
    //   setCC(textSelectBox)

    //   function showFrontText(isBox){
    //     if(isBox){
    //       setCC(textSelectComponent)
    //       frontText.setContent(textSelectComponent)
    //     }else{
    //       frontText.setContent(textSelectBox)
    //       setCC(textSelectBox)
    //     }
    //   }
    //   let checkCnnctn = "";
    //   let wrongNoTimes = "";

    //   let reset = function(){
    //         Dom.setBlinkArrowRed(-1)
    //         frontText.show()
    //         showFrontText(false)
            
    //         Scenes.items.part1_circuit.set(140,180,220)
    //         Scenes.items.box2.set(213,143,80,90).zIndex(2)
    //         Scenes.items.box4.set(410,143,80,90).zIndex(2)
    //         Scenes.items.box1.set(96,248,90).zIndex(2)
    //         Scenes.items.box3.set(317,248,90).zIndex(2)
    //         Scenes.items.box5.set(515,248,90).zIndex(2)
    //         Scenes.items.box6.set(612,248,90).zIndex(2)
      
      
    //         // symbols required position
    //         Scenes.items.symbol_vIn.set(40,-20, 60).zIndex(5)
    //         Scenes.items.symbol_L.set(208,-20, 60).zIndex(5)
    //         Scenes.items.symbol_C.set(208 + 150,-25, 60).zIndex(5)
    //         Scenes.items.symbol_S.set(208 + 150 + 50,-40, 60).zIndex(5)
    //         Scenes.items.symbol_D.set(208 + 150 + 270,-25, 55).zIndex(5)
    //         Scenes.items.symbol_R.set(208 + 150 + 350,-30, 55).zIndex(5)
            
    //         //!Correct positons      
    //         let st = { rotate: "0deg" }
    //         Scenes.items.part1_component_voltage.set(5+40,-20,152,73).styles(st).zIndex(3)
    //         Scenes.items.part1_component_inductor.set(85+70,-20,116).styles(st).zIndex(3)
    //         Scenes.items.part1_component_capacitor.set(85+190+70,-20,141).styles(st).zIndex(3)
    //         Scenes.items.part1_component_mosfet.set(440,-10, 150).styles(st).zIndex(3)
    //         Scenes.items.part1_component_diode.set(85+190+270+70,-20,136).styles(st).zIndex(3)
    //         Scenes.items.part1_component_resistance.set(85+190+350+70,-31,149).styles(st).zIndex(3)
          

    //       Scenes.items.part1_incrrct_text.set(10,40, null, 790).hide()

    //       ee3_btn_check.classList.add("btn-deactive")

    //       resetActive = "";
    //       checkCnnctn = "";
    //       // wrongNoTimes = "";

    //       for(let i in boxAnimes){
    //         boxAnimes[i].pause();
    //       }
  
    //     // Scenes.steps[2]()  
    //   }

    //   let check = function(){
    //     Dom.setBlinkArrowRed(-1)
    //     console.log(checkCnnctn)
    //     if(checkCnnctn == "111111"){
    //     Scenes.items.part1_crrct_text.set(10,40, null, 790)
    //       // after complete
    //       Dom.setBlinkArrow(true, 790, 408).play()
    //       setCC("Click 'Next' to go to next step")
    //       setIsProcessRunning(false)
    //     }
    //     else{
    //       Scenes.items.part1_incrrct_text.set(10,40, null, 790) 
    //       wrongNoTimes+="1";
    //       if(wrongNoTimes == "1"){
    //         Dom.setBlinkArrowRed(true,882,-18,30,30,90).play()
    //         ee3_btn_hint.classList.remove("btn-deactive")
    //         frontText.hide()
    //       }
    //       console.log("wrong no. of times",wrongNoTimes)
    //         }
    //   }

    //   let boxAnimes = [];


    //   //function to blink boxes to different color
    //   function boxAnime(){
    //     var myObject = {
    //       prop1: 0,
    //       prop2: 0,
    //       prop3: 0,
    //       prop4: 0,
    //       prop5: 0,
    //       prop6: 0,
    //     }
        
    //     let boxBlink_1 = anime({
    //       targets: myObject,
    //       prop1: 360,
    //       easing: 'linear',
    //       round: 1000,
    //       update: function() {
    //         box1.item.style.filter = `hue-rotate(${(myObject.prop1)}deg)`;
    //       },
    //       loop: true,
    //       autoplay: false,

    //     });
    //     let boxBlink_2 = anime({
    //       targets: myObject,
    //       prop2: 360,
    //       easing: 'linear',
    //       round: 1000,
    //       update: function() {
    //         box2.item.style.filter = `hue-rotate(${(myObject.prop2)}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,

    //     });
    //     let boxBlink_3 = anime({
    //       targets: myObject,
    //       prop3: 360,
    //       easing: 'linear',
    //       round: 1000,
    //       update: function() {
    //         box3.item.style.filter = `hue-rotate(${(myObject.prop3)}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,

    //     });
    //     let boxBlink_4 = anime({
    //       targets: myObject,
    //       prop4: 360,
    //       easing: 'linear',
    //       round: 1000,
    //       update: function() {
    //         box4.item.style.filter = `hue-rotate(${(myObject.prop4)}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,

    //     });
    //     let boxBlink_5 = anime({
    //       targets: myObject,
    //       prop5: 360,
    //       easing: 'linear',
    //       round: 1000,
    //       update: function() {
    //         box5.item.style.filter = `hue-rotate(${(myObject.prop5)}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,

    //     });
    //     let boxBlink_6 = anime({
    //       targets: myObject,
    //       prop6: 360,
    //       easing: 'linear',
    //       round: 1000,
    //       update: function() {
    //         box6.item.style.filter = `hue-rotate(${(myObject.prop6)}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,

    //     });

    //      boxAnimes = [boxBlink_1, boxBlink_2, boxBlink_3, boxBlink_4, boxBlink_5, boxBlink_6]
    //   }

    //   let ee3_btn_check = Scenes.items.ee3_btn_check.set(720-80,-70,null, 90).item
    //   let ee3_btn_reset = Scenes.items.ee3_btn_reset.set(720-80+100,-70, null, 90).item
    //   let ee3_btn_hint =  Scenes.items.ee3_btn_hint.set(720-80+200,-70, null, 90).item
      
      
    //   ee3_btn_check.classList.add("btn-deactive")
    //   ee3_btn_hint.classList.add("btn-deactive")


    //   ee3_btn_check.onclick = check
    //   ee3_btn_reset.onclick = reset

    //   let isShow = 0;
    //   Scenes.items.part1_crrct_circuit.set(20,-20, 450).zIndex(10).hide()
    //   ee3_btn_hint.onclick = () => {
    //     Dom.setBlinkArrowRed(-1)
    //     if(!isShow){
    //       Scenes.items.part1_crrct_circuit.show()
    //       isShow = 1;
    //     }else{
    //       Scenes.items.part1_crrct_circuit.hide()
    //       isShow = 0
    //     }
    //   }


    //   //! Required items 


    //   // Dom.setBlinkArrowRed(true,100,78,30,30,90).play()

    //   Scenes.items.part1_circuit.set(140,180,220)
    //   Scenes.items.box2.set(213,143,80,90).zIndex(2)
    //   Scenes.items.box4.set(410,143,80,90).zIndex(2)
    //   Scenes.items.box1.set(96,248,90).zIndex(2)
    //   Scenes.items.box3.set(317,248,90).zIndex(2)
    //   Scenes.items.box5.set(515,248,90).zIndex(2)
    //   Scenes.items.box6.set(612,248,90).zIndex(2)


    //   // symbols required position
    //   Scenes.items.symbol_vIn.set(40,-20, 60).zIndex(5)
    //   Scenes.items.symbol_L.set(208,-20, 60).zIndex(5)
    //   Scenes.items.symbol_C.set(208 + 150,-25, 60).zIndex(5)
    //   Scenes.items.symbol_S.set(208 + 150 + 50,-40, 60).zIndex(5)
    //   Scenes.items.symbol_D.set(208 + 150 + 270,-25, 55).zIndex(5)
    //   Scenes.items.symbol_R.set(208 + 150 + 350,-30, 55).zIndex(5)
      
    //   //!Correct positons      
    //   Scenes.items.part1_component_voltage.set(5+40,-20,152,73).rotate(0).zIndex(3)
    //   Scenes.items.part1_component_inductor.set(85+70,-20,116).rotate(0).zIndex(3)
    //   Scenes.items.part1_component_capacitor.set(85+190+70,-20,141).rotate(0).zIndex(3)
    //   Scenes.items.part1_component_mosfet.set(440,-10, 150).rotate(0).zIndex(3)
    //   Scenes.items.part1_component_diode.set(85+190+270+70,-20,136).rotate(0).zIndex(3)
    //   Scenes.items.part1_component_resistance.set(85+190+350+70,-31,149).rotate(0).zIndex(3)

      
    //       let compo = {
    //         box : null,
    //         item : null,
  
    //       }
    //   // !box clicked

    //   boxAnime();

  
    //   let box1 = Scenes.items.box1
    //   box1.item.onclick = ()=>{
    //     boxAnimes[0].play();
    //     console.log("box1 clicked")
    //     compo.box = box1
    //     // added text
    //     showFrontText(true)
    //   }
    //   let box2 = Scenes.items.box2
    //   box2.item.onclick = ()=>{
    //     boxAnimes[1].play();
    //     console.log("box2 clicked")
    //     compo.box = box2
    //     // added text
    //     showFrontText(true)
    //   }
    //   let box3 = Scenes.items.box3
    //   box3.item.onclick = ()=>{
    //     boxAnimes[2].play();
    //     console.log("box3 clicked")
    //     compo.box = box3
    //     // added text
    //     showFrontText(true)
    //   }
    //   let box4 = Scenes.items.box4
    //   box4.item.onclick = ()=>{
    //     boxAnimes[3].play();
    //     console.log("box4 clicked")
    //     compo.box = box4
    //     // added text
    //     showFrontText(true)
    //   }
    //   let box5 = Scenes.items.box5
    //   box5.item.onclick = ()=>{
    //     boxAnimes[4].play();
    //     console.log("box5 clicked")
    //     compo.box = box5
    //     // added text
    //     showFrontText(true)
    //   }
    //   let box6 = Scenes.items.box6
    //   box6.item.onclick = ()=>{
    //     boxAnimes[5].play();
    //     console.log("box6 clicked")
    //     compo.box = box6
    //     // added text
    //     showFrontText(true)
    //   }

    //   //item click
    //   let item1 = Scenes.items.part1_component_voltage
    //   item1.item.onclick = ()=>{
    //     console.log("item1 clicked")
    //     compo.item = item1
    //     toSet();
    //     // added text
    //     showFrontText(false)
    //   }
    //   let item2 = Scenes.items.part1_component_inductor
    //   item2.item.onclick = ()=>{
    //     console.log("item2 clicked")
    //     compo.item = item2
    //     toSet();
    //     // added text
    //     showFrontText(false)
    //   }
    //   let item3 = Scenes.items.part1_component_capacitor
    //   item3.item.onclick = ()=>{
    //     console.log("item3 clicked")
    //     compo.item = item3
    //     toSet();
    //     // added text
    //     showFrontText(false)
    //   }
    //   let item4 = Scenes.items.part1_component_mosfet
    //   item4.item.onclick = ()=>{
    //     console.log("item4 clicked")
    //     compo.item = item4
    //     toSet();
    //     // added text
    //     showFrontText(false)
    //   }
    //   let item5 = Scenes.items.part1_component_diode
    //   item5.item.onclick = ()=>{
    //     console.log("item5 clicked")
    //     compo.item = item5
    //     toSet();
    //     // added text
    //     showFrontText(false)
    //   }
    //   let item6 = Scenes.items.part1_component_resistance
    //   item6.item.onclick = ()=>{
    //     console.log("item6 clicked")
    //     compo.item = item6
    //     toSet();
    //     // added text
    //     showFrontText(false)
    //   }

    //   let resetActive = "";

    // //! function to set the element
    // let toSet = function(){
    //   resetActive += "1";
      
    //   console.log(resetActive)

    //   if(resetActive == "111111"){
    //     Dom.setBlinkArrowRed(true,690,-18,30,30,90).play()
    //     ee3_btn_check.classList.remove("btn-deactive")
    //     boxAnimes.forEach(animeObj=>{
    //       animeObj.pause()
    //     })
    //   }
    
      
    //   let boxName = compo.box
    //   let itemName = compo.item

    //   function toSetItem (target, left_=null, top_=null, height_=null, width_=null){
    //     anime({
    //       targets: target.item,
    //       duration: 1000,
    //       easing: "easeInOutQuad",
    //       height: height_,
    //       width: width_, 
    //       left: left_,
    //       top : top_
    //     })
    //   }
    //   function toSetSymbol (target, left_ = null, top_ = null){
    //     anime({
    //       targets: target.item,
    //       duration: 1000,
    //       easing: "easeInOutQuad",
    //       left: left_,
    //       top : top_
    //     })
    //   }

    //   let vIn = Scenes.items.symbol_vIn
    //   let L = Scenes.items.symbol_L
    //   let C = Scenes.items.symbol_C
    //   let S = Scenes.items.symbol_S
    //   let D = Scenes.items.symbol_D
    //   let R = Scenes.items.symbol_R
      
    //   //!if item1 clicked
    //   if(itemName == item1 && boxName == box1){
    //     box1.hide()
    //     toSetItem(item1, 113.4, 191)
    //     toSetSymbol(vIn, 77, 183 )
    //     // item1.set(118.5,178,150)
    //     checkCnnctn+="1"
    //     console.log(checkCnnctn)

    //   }
    //   if(itemName == item1 && boxName == box2){
    //     item1.styles({
    //       rotate: "90deg"
    //     })
    //     box2.hide()
    //     // item1.set(242,73,225)
    //     toSetItem(item1, 250,110.5)
    //     toSetSymbol(vIn, 219, 205)

    //   }
    //   if(itemName == item1 && boxName == box3){
    //       box3.hide()
    //     // item1.set(307, 193,150)
    //     toSetItem(item1, 324.4, 193,150)
    //     toSetSymbol(vIn, 272, 256)
    //   }
    //   if(itemName == item1 && boxName == box4){
    //     item1.styles({
    //       rotate: "90deg"
    //     })
    //     box4.hide()
    //     // item1.set(415, 109)
    //     toSetItem(item1, 450, 110.5)
    //     toSetSymbol(vIn, 397, 204)

    //   }
    //   if(itemName == item1 && boxName == box5){
    //     box5.hide()
    //     // item1.set(485, 194)
    //     toSetItem(item1, 521.8, 194)
    //     toSetSymbol(vIn, 462, 256)
        
    //   }
    //   if(itemName == item1 && boxName == box6){
    //         box6.hide()
    //     // item1.set(588, 194)
    //     toSetItem(item1, 606.4, 194)
    //     toSetSymbol(vIn, 665, 267)
    //   }

    //   //!if item2 clicked
    //   if(itemName == item2 && boxName == box1){
    //     item2.styles({
    //       rotate: "90deg"
    //     })
    //     box1.hide()
    //     // item2.set(100, 212)
    //     toSetItem(item2, 101.7, 258)
    //     toSetSymbol(L, 61, 251)
    //   }
    //   if(itemName == item2 && boxName == box2){
    //     box2.hide()
    //     toSetItem(item2, 200, 94)
    //     toSetSymbol(L, 226, 209)

    //     // item2.set(171, 90)
    //   }
    //   if(itemName == item2 && boxName == box3){
    //     item2.styles({
    //       rotate: "90deg"
    //     })
    //     box3.hide()
    //     // item2.set(288, 230)
    //     toSetItem(item2, 312.5, 258)
    //     toSetSymbol(L, 288, 256)
    //   }
    //   if(itemName == item2 && boxName == box4){
    //     box4.hide()
    //     toSetItem(item2, 400, 94)
    //     toSetSymbol(L, 393, 208)
    //     // item2.set(339, 90)
    //     checkCnnctn+="1"
    //     console.log(checkCnnctn)

    //   }
    //   if(itemName == item2 && boxName == box5){
    //     item2.styles({
    //       rotate: "90deg"
    //     })
    //     box5.hide()
    //     toSetItem(item2, 510.5, 258)
    //     toSetSymbol(L, 488, 256)

    //     // item2.set(467, 230)

    //   }
    //   if(itemName == item2 && boxName == box6){
    //     item2.styles({
    //       rotate: "90deg"
    //     })
    //     box6.hide()
    //     toSetItem(item2, 594.5, 258)
    //     toSetSymbol(L, 665, 267)

    //     // item2.set(569, 230)
    //   }

      
    //   //! if item3 clicked
    //   if(itemName == item3 && boxName == box1){
    //     box1.hide()
    //     // item3.set(129, 195)
    //     toSetItem(item3, 125, 206)
    //     toSetSymbol(C, 143, 191)
    //   }
    //   if(itemName == item3 && boxName == box2){
    //     item3.styles({
    //       rotate: "90deg"
    //     })
    //     box2.hide()
    //     // item3.set(235,133)
    //     toSetItem(item3, 238,127.7)
    //     toSetSymbol(C, 280, 180)

    //   }
    //   if(itemName == item3 && boxName == box3){
    //     box3.hide()
    //     // item3.set(318, 213)
    //     toSetItem(item3, 335.8, 206)
    //     toSetSymbol(C, 288, 256)
    //   }
    //   if(itemName == item3 && boxName == box4){
    //     item3.styles({
    //       rotate: "90deg"
    //     })
    //     box4.hide()
    //     // item3.set(399, 133)
    //     toSetItem(item3, 438,127.7)
    //     toSetSymbol(C, 455, 185)
    //   }
    //   if(itemName == item3 && boxName == box5){
    //     box5.hide()
    //     // item3.set(496, 213)
    //     toSetItem(item3, 533.4, 206)
    //     toSetSymbol(C, 488, 256)
    //     checkCnnctn+="1"
    //     console.log(checkCnnctn)

    //   }
    //   if(itemName == item3 && boxName == box6){
    //     box6.hide()
    //     toSetItem(item3, 617.9, 206)
    //     toSetSymbol(C, 665, 267)

    //     // item3.set(599, 213)
    //   }

    //    //! if item4 clicked
    //    if(itemName == item4 && boxName == box1){
    //     item4.styles({
    //       rotate: "90deg"
    //     })
    //     box1.hide()
    //     toSetItem(item4, 36, 220)
    //     toSetSymbol(S, 148, 201)
    //     // item4.set(55, 205)
    //  }
    //   if(itemName == item4 && boxName == box2){
    //     box2.hide()
    //     toSetItem(item4, 184, 135)
    //     toSetSymbol(S, 167, 121)

    //     // item4.set(171, 124)
    //     checkCnnctn+="1"
    //     console.log(checkCnnctn)


    //   }
    //   if(itemName == item4 && boxName == box3){
    //     item4.styles({
    //       rotate: "90deg"
    //     })
    //     box3.hide()
    //     toSetItem(item4, 247, 220)
    //     toSetSymbol(S, 299, 200)

    //     // item4.set(243, 221)

    //   }
    //   if(itemName == item4 && boxName == box4){
    //     box4.hide()
    //     toSetItem(item4, 384, 135)
    //     toSetSymbol(S, 366, 123)

    //     // item4.set(346, 124)
    //   }
    //   if(itemName == item4 && boxName == box5){
    //     item4.styles({
    //       rotate: "90deg"
    //     })
    //     box5.hide()
    //     toSetItem(item4, 444, 220)
    //     toSetSymbol(S, 490, 200)

    //     // item4.set(420, 221)
    //   }
    //   if(itemName == item4 && boxName == box6){
    //     item4.styles({
    //       rotate: "-90deg"
    //     })
    //     box6.hide()
    //     toSetItem(item4, 579.9, 220)
    //     toSetSymbol(S, 580, 210)

    //     // item4.set(525, 221)
    //   }

    //   // ! if item5 clicked
    //   if(itemName == item5 && boxName == box1){
    //     box1.hide()
    //     toSetItem(item5,130.6, 220)
    //     toSetSymbol(D, 143, 214)
    //     // item5.set(134, 214)
    //   }
    //   if(itemName == item5 && boxName == box2){
    //     item5.styles({
    //       rotate: "90deg"
    //     })
    //     box2.hide()
    //     toSetItem(item5, 222, 138)
    //     toSetSymbol(D, 261, 184)

    //     // item5.set(222, 144)
    //   }
    //   if(itemName == item5 && boxName == box3){
    //         box3.hide()
    //     // item5.set(322, 230)
    //     toSetItem(item5, 341.4, 220)
    //     toSetSymbol(D, 288, 256)
    //     checkCnnctn+="1"
    //     console.log(checkCnnctn)

    //   }
    //   if(itemName == item5 && boxName == box4){
    //     item5.styles({
    //       rotate: "90deg"
    //     })
    //       box4.hide()
    //     // item5.set(387, 144)
    //     toSetItem(item5, 422, 138)
    //     toSetSymbol(D, 462, 182)

    //   }
    //   if(itemName == item5 && boxName == box5){
    //         box5.hide()
    //         toSetItem(item5, 539, 220)
    //       toSetSymbol(D, 488, 256)

    //     // item5.set(500, 230)
    //   }
    //   if(itemName == item5 && boxName == box6){
    //       box6.hide()
    //       toSetItem(item5, 623.5, 220)
    //     toSetSymbol(D, 655, 267)

    //     // item5.set(604, 230)
    //   }


    //   //! if item6 clicked
    //   if(itemName == item6 && boxName == box1){
    //     box1.hide()
    //     toSetItem(item6, 130, 206)
    //     toSetSymbol(R, 139, 195)
    //     // item6.set(132, 198)
    //   }
    //   if(itemName == item6 && boxName == box2){
    //     item6.styles({
    //       rotate: "90deg"
    //     })
    //     box2.hide()
    //     toSetItem(item6, 239, 124.5)
    //     toSetSymbol(R, 278, 188)
    //     // item6.set(239, 129)
    //   }
    //   if(itemName == item6 && boxName == box3){
    //         box3.hide()
    //     // item6.set(321, 214)
    //     toSetItem(item6, 340.8, 206)
    //     toSetSymbol(R, 288, 256)
    //   }
    //   if(itemName == item6 && boxName == box4){
    //     item6.styles({
    //       rotate: "90deg"
    //     })
    //       box4.hide()
    //       toSetItem(item6, 439, 124.5)
    //       toSetSymbol(R, 451, 198)
    //       // item6.set(402, 129)
    //   }
    //   if(itemName == item6 && boxName == box5){
    //         box5.hide()
    //         toSetItem(item6, 538.4, 206)
    //         toSetSymbol(R, 488, 256)

    //     // item6.set(498, 214)
    //   }
    //   if(itemName == item6 && boxName == box6){
    //         box6.hide()
    //         toSetItem(item6, 622.9, 206)
    //         toSetSymbol(R, 655, 267)
    //         // item6.set(601, 214)
    //         checkCnnctn+="1"
    //   }
      
    //   compo.box  = null
    //   compo.item  = null

    // }
    //   // ------ end



    //   return true
    // }),



    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      // Scenes.items.btn_transparent.hide()

      Scenes.setStepHeading("Step-1", "Circuit Formulation");
        

      setCC("Click on the correct BOX for placing the highlighted component.")
      Scenes.items.new_part_1_circuit_full.set(116, 117, 287, 744)


      //! box blink --> to blink the box
      let boxAnimes = []
      function boxAnime(){
        var myObject = {
          prop1: 0,
          prop2: 0,
          prop3: 0,
          prop4: 0,
          prop5: 0,
          prop6: 0,
        }


        let 
        box1 = Scenes.items.domQs1
        box2 = Scenes.items.domQs2
        box3 = Scenes.items.domQs3
        box4 = Scenes.items.domQs4
        box5 = Scenes.items.domQs5
        box6 = Scenes.items.domQs6
        let boxBlink_1 = anime({
          targets: myObject,
          prop1: 360,
          easing: 'linear',
          round: 1000,
          update: function() {
            box1.item.style.filter = `hue-rotate(${(myObject.prop1)}deg)`;
          },
          loop: true,
          autoplay: false,

        });
        let boxBlink_2 = anime({
          targets: myObject,
          prop2: 360,
          easing: 'linear',
          round: 1000,
          update: function() {
            box2.item.style.filter = `hue-rotate(${(myObject.prop2)}deg)`;
          },
          autoplay: false,
          loop: true,

        });
        let boxBlink_3 = anime({
          targets: myObject,
          prop3: 360,
          easing: 'linear',
          round: 1000,
          update: function() {
            box3.item.style.filter = `hue-rotate(${(myObject.prop3)}deg)`;
          },
          autoplay: false,
          loop: true,

        });
        let boxBlink_4 = anime({
          targets: myObject,
          prop4: 360,
          easing: 'linear',
          round: 1000,
          update: function() {
            box4.item.style.filter = `hue-rotate(${(myObject.prop4)}deg)`;
          },
          autoplay: false,
          loop: true,

        });
        let boxBlink_5 = anime({
          targets: myObject,
          prop5: 360,
          easing: 'linear',
          round: 1000,
          update: function() {
            box5.item.style.filter = `hue-rotate(${(myObject.prop5)}deg)`;
          },
          autoplay: false,
          loop: true,

        });
        let boxBlink_6 = anime({
          targets: myObject,
          prop6: 360,
          easing: 'linear',
          round: 1000,
          update: function() {
            box6.item.style.filter = `hue-rotate(${(myObject.prop6)}deg)`;
          },
          autoplay: false,
          loop: true,

        });

         boxAnimes = [boxBlink_1, boxBlink_2, boxBlink_3, boxBlink_4, boxBlink_5, boxBlink_6]
      }
      // box img mapping to domQus
      let boxCount = 1;
 
      // ! Required Postion
      Scenes.items.new_box_img.set(4, -29, 136)

      //! Required positions
      Scenes.items.new_component_voltage.set(18, -24, 123).zIndex(5)
      Scenes.items.new_component_resistance.set(197, -30, 139).zIndex(5)
      Scenes.items.new_component_mosfet.set(285, -24, 133).zIndex(5)
      Scenes.items.new_component_transformer.set(458, -8, 95).zIndex(5)
      Scenes.items.new_component_capacitor.set(646, -33, 144).zIndex(5) 
      Scenes.items.new_component_diode.set(765, 27, 100).zIndex(5)
 
      Scenes.items.slider_box.hide()

      let tempText = Scenes.items.tempText.set(450,360).hide()
      
      // * Part One Logic
      Scenes.items.domQs1.set(84, 188, 100).zIndex(3)
      Scenes.items.domQs2.set(817, 181, 100).zIndex(3)
      Scenes.items.domQs3.set(376, 289, 100).zIndex(3)
      Scenes.items.domQs4.set(392, 178, 100, 142).zIndex(3)
      Scenes.items.domQs5.set(706, 183, 100).zIndex(3)
      Scenes.items.domQs6.set(595, 99, null, 100).zIndex(3)
      let qsBtns = document.querySelectorAll(".qs")

      // Adding onclick to all qs
      // boxAnime()
      for(let i in qsBtns){
        qsBtns[i].onclick = function(){
          checkClick(qsBtns[i])
          // boxAnimes[i].play()
        }
      }
      Scenes.items.domQs6.item.onclick = function(){
          if(boxCount>5){
    
            // after complete
            Scenes.items.new_box_img.hide()
            // Dom.setBlinkArrow(true, 790, 408).play();
            Scenes.items.part1_crrct_text.set(null,-10,90)
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }
          checkClick(Scenes.items.domQs6.item)
      }

      const checkClick = (qsBtnDom) =>{
        let isSame = qsBtnDom.classList.contains(`qs${boxCount}`)
        if(isSame){
          animateComponent(qsBtnDom);
          // to go to next component
          boxCount++
          tempText.hide()
          // tempText.show()
          // tempText.setContent("Correct component click.")
          // tempText.item.style.color = "green"
          // anime({
          //   targets: tempText.item,
          //   duration: 400,
          //   opacity: [0,0.5,1]
          // })
        }
        else{
          let st = {
            backgroundColor: "transperant",
            color: "red",
            width: "fit-content",
            fontSize: "larger",
          }
          tempText.show()
          tempText.setContent("This in incorrect placement of component, Try again").styles(st)
          anime({
            targets: tempText.item,
            duration: 400,
            opacity: [0,0.5,1]
          })
          
          qsBtnDom.style.backgroundColor = 'red';
        }
       
      }

      // * for animate after check click
      const animateComponent = (qsBtnDom)=>{
        let compo = [
          Scenes.items.new_component_voltage,
          Scenes.items.new_component_resistance,
          Scenes.items.new_component_mosfet,
          Scenes.items.new_component_transformer,
          Scenes.items.new_component_capacitor, 
          Scenes.items.new_component_diode,
        ]

        let props = [

          [154, -35, 150, 131],
          [279, -35, 150, 174],
          [462, -35, 150, 196],
          [653, -33, 150, 106],
          [757, -23, 140, 181],
        ]


        // after new figures added 
        let left = [37, 837, 300, 365, 680, 558]
        let top = [179, 163, 276, 182, 156, 101]

        anime.timeline({
          duration: 2000,
          easing: "easeInOutQuad",
        })
        .add({
          targets:compo[boxCount - 1].item,
          top: top[boxCount-1],
          left: left[boxCount-1],
          begin(){
            anime({
              targets: qsBtnDom,
              opacity: 0,
              duration: 2000,
              complete(){
                qsBtnDom.style.display = "none"
              }
            })
          },

          complete(){
            for(let i of qsBtns){
              i.style.backgroundColor = "#05bc57";
            }
          }
        })
        .add({
          targets: Scenes.items.new_box_img.item,
          left: props[boxCount-1][0],
          top: props[boxCount-1][1],
          height: props[boxCount-1][2],
          width: props[boxCount-1][3],
          
        })

        
        

      }
      
      // ! Final Position
      // Scenes.items.box_img.set(0,0)
      // Scenes.items.component_mosfet.set(0,0)
      // Scenes.items.component_register.set(0,0)
      // Scenes.items.component_diode.set(0,0)
      // Scenes.items.component_inductor.set(0,0)
      // Scenes.items.component_battery.set(0,0) 
      // Scenes.items.component_capacitor.set(0,0)
      
      // Dom.setBlinkArrow(true,65,130 ).play()
      // onclick
      
      return true
    }),
    (step2 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      
      Scenes.items.btn_next.show();
      function stepTutorial2(){

        setCC("Select V<sub>in</sub>")
          Dom.setBlinkArrowRed(true,110,89,30,30,90).play()
          
          sliders.selectOp1.oninput = ()=>{
            Dom.setBlinkArrowRed(true,270,89,30,30,90).play()
            setCC("Select R")

            sliders.selectOp2.oninput = ()=>{
              Dom.setBlinkArrowRed(true,440,89,30,30,90).play()
              setCC("Select Turns ratio")
      
              sliders.selectOp3.oninput = ()=>{
                Dom.setBlinkArrowRed(true,98,144,30,30,90).play()
                setCC("Select D")
        

              sliders.slider.onclick = ()=>{
                Dom.setBlinkArrowRed(true,400,8,30,30,90).play()
                setCC("Press Record")   

              }
            }
          }
        }
      }
      stepTutorial2()
      
   

  //! Required Items
  Scenes.items.btn_record.set(355, -40)
  Scenes.items.slider_box.set(40,25)
  sliders.generateOptionsFor(-1)


  Scenes.items.new_part_2_circuit_full.set(10,155, 220)
  Scenes.items.slider_box.item.style.scale = "0.9";
  // sliders.hideSliderAndOption(0)


  
  // * for bigger screen
  /*
  let l = 465
  let t = -75
  let h = 474
  let w = 470
  Scenes.items.part_2_graph_data_upper.set(l,t,h,w).zIndex(2).hide()
  */
  let l = 530
  let t = -79
  let h = 480
  let w = 405
  // Scenes.items.part_2_graph_data_upper.set(l-50,t,h,w+58).zIndex(2).hide()
  Scenes.items.part_2_graph_empty.set(l, t, h, w).hide();
  Scenes.items.new_part_2_graph_1.set(l, t, h, w).hide();
  Scenes.items.new_part_2_graph_2.set(l, t, h, w).hide();
  Scenes.items.new_part_2_graph_3.set(l, t, h, w).hide();
       
  // ! temp values and text
  let st = {
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
    borderRadius: "0",
    width: "fit-content",
    textAlign: "center",
    padding: "0",
    fontSize: "0.7rem",
    lineHeight: "13px"
  }
  let textLabels = [
<<<<<<< Updated upstream
=======
    // ! iL
    iL = Scenes.items.tempTitle24.set(891,21).setContent("0 A").styles(st).hide(),
>>>>>>> Stashed changes
    
    // ! iIn

    iInOn = Scenes.items.tempTitle25.set(613,-7).setContent("0 V").styles(st).hide(),
    iInOff = Scenes.items.tempTitle26.set(813,-7).setContent("0 V").styles(st).hide(),

    // ! vL

    vLon = Scenes.items.tempTitle27.set(614,69).setContent("0 us").styles(st).hide(),
    vLoff = Scenes.items.tempTitle28.set(893,125).setContent("0 us").styles(st).hide(),

    // ! vSw

    vSwon = Scenes.items.tempTitle29.set(618,157).setContent("0 V").styles(st).hide(),
    vSwoff = Scenes.items.tempTitle30.set(814,155).setContent("0 V").styles(st).hide(),

    // ! vDf
    
    vDfon = Scenes.items.tempTitle32.set(621,212).setContent("0 V").styles(st).hide(),
    vsDfoff = Scenes.items.tempTitle33.set(812,213).setContent("0 V").styles(st).hide(),

    // ! iC

    iCon = Scenes.items.tempTitle34.set(620,293).setContent("0 A").styles(st).hide(),
    iCoff = Scenes.items.tempTitle35.set(814,252).setContent("0 A").styles(st).hide(),

    // ! vC
    
    vC = Scenes.items.tempTitle36.set(844,318).setContent("0 V").styles(st).hide(),
  ]    
 
      let currentGraph = Scenes.items.part_2_graph_empty

       
      // *  chage the step size of the sliders
      // let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
      let dutyRatioSlider = Scenes.items.slider_D.item;
      dutyRatioSlider.min = "0.25";
      dutyRatioSlider.max = "0.75";
      dutyRatioSlider.step = "0.25";
<<<<<<< Updated upstream
      Scenes.items.slider_D.item.value = "0.25";
=======
      get(".slider_D_input").value = "0.25";
>>>>>>> Stashed changes
      
      let isOneTimeOver = false
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function () {
        Dom.setBlinkArrowRed(-1)
        // ! Activate the next btn right after the click
        
        
        let vInValue = Number(sliders.selectOp1.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)
        let nValue = Number(sliders.selectOp3.value)

        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // setting values from formulas
        function setTempTitleAndValues(showValues=false,vInValue=0){  
    
<<<<<<< Updated upstream
          let v0 = Number(Formulas.step2.v0(values)).toFixed(1)
          let iIn  = Number(Formulas.step2.iIn(values)).toFixed(1)


          let textValues = [
=======
          let v0 = Number(parseFloat(Formulas.step2.v0(values)).toFixed(1))
          let iIn  = Number(parseFloat(Formulas.step2.iIn(values)).toFixed(1))
          let iL = Number(parseFloat( iIn / dutyRatioValue).toFixed(1))

          let textValues = [
            iLArr = `${ iIn / dutyRatioValue}A`,
>>>>>>> Stashed changes

            iInOn = `${iIn}A`,
            iInOff = `${ 0 }A`,

            vLon = `${ vInValue }V`,
            vLoff = `${ -v0 / nValue}V`,

            vSwon = `${ 0}V`,
<<<<<<< Updated upstream
            vSwoff = `${ vInValue + v0/nValue}V`,

            vDfon = `${ nValue * vInValue + v0}V`,
            vDfoff = `${ 0}V`,

            iL = `${ iIn / dutyRatioValue}A`,
            vC = `${v0}V`,

            iCon = `${ -v0 / resistanceValue}A`,
            iCoff = `${ (iL /nValue) - (v0/resistanceValue)}A`,

            vC = `${v0}V`,
          ]  
=======
            vSwoff = `${ vInValue + (v0/nValue)}V`,

            vDfon = `${ ((nValue * vInValue) + v0)}V`,
            vDfoff = `${ 0}V`,

            iCon = `${ parseFloat(-v0 / resistanceValue).toFixed(1)}A`,
            iCoff = `${ parseFloat((iL / nValue) - (v0 /resistanceValue)).toFixed(1)}A`,

            vC = `${v0}V`,
          ]  

          console.log("values",iL,nValue,v0,resistanceValue)
>>>>>>> Stashed changes
      
          // also show the all values and graph uppper image
          // Scenes.items.part_2_graph_data_upper.show()
          if(showValues){
            textLabels.forEach((ele,idx)=>{
              ele.setContent(textValues[idx]).show()
            })
          }


        }
        setTempTitleAndValues(true,vInValue)


        if (dutyRatioValue == 0.25){
          currentGraph.hide();
          Scenes.items.new_part_2_graph_1.show();
          currentGraph = Scenes.items.new_part_2_graph_1;
        }
        if (dutyRatioValue == 0.5){
          currentGraph.hide();
          Scenes.items.new_part_2_graph_2.show();
          currentGraph = Scenes.items.new_part_2_graph_2;
        }
        if (dutyRatioValue == 0.75){
          currentGraph.hide();
          Scenes.items.new_part_2_graph_3.show();
          currentGraph = Scenes.items.new_part_2_graph_3;
        }
        // setIsProcessRunning(false);
        // Dom.setBlinkArrow(true, 630, 315)

        // speak test
        if(isOneTimeOver==false){
          setCC("For the these set input voltage and duty ratio, various component voltage and current waveforms are displayed here.",6)
          isOneTimeOver = true
        }

        // after complete
        setTimeout(()=>{
          Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
        },5000)
      };
      


      
      return true
    }),
    (step3 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-3", "Performance Analysis.");
      setCC("Click on the 'ICON' to plot the performance characteristics.")
      
      // * remove all previous restrictions
      
      // * Required Elements

      // Scenes.items.circuit_full_2.set(6,40,230)
      Scenes.items.new_part_3_select_option_full.set(-11, -59, 463, 800)
      Scenes.items.new_part_3_select_option_1.set(203, -19, 190, 267).zIndex(2)
      Scenes.items.new_part_3_select_option_2.set(474, -18, 189, 262).zIndex(2)
      Scenes.items.new_part_3_select_option_3.set(204, 175, 190, 265).zIndex(2)
      Scenes.items.new_part_3_select_option_4.set(474, 176, 189, 270).zIndex(2)
      // // hide the slider
      Scenes.items.slider_box.hide()

      let rightTicks = [
        Scenes.items.right_tick_1.set(20,280).hide(),
        Scenes.items.right_tick_2.set(208,280).hide().zIndex(2001),
        Scenes.items.right_tick_3.set(435,280).hide(),
        Scenes.items.right_tick_4.set(630,280).hide()
      ]

      // hide all tables
      // Scenes.items.part3_table_one.hide()
      // Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      // Scenes.items.part3_table_four.hide()
      // Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }

      // resetSliderValue()
      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.new_part_3_select_option_1,
        Scenes.items.new_part_3_select_option_2,
        Scenes.items.new_part_3_select_option_3,
        Scenes.items.new_part_3_select_option_4,
      ]

      // ! Destroy Graphs
      function destroyGraphs(){
        for(let i=0;i<7;i++){
          if(Scenes.items.chart[i]!=null){
            Scenes.items.chart[i].destroy()
          }
        }
      }
      // destroyGraphs()

      
      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        

        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[0+5]()
      }
      const opTwo = ()=>{
       

        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[1+5]()
      }
      const opThree = ()=>{
        

        Scenes.optionsDone[2]=1;
        Scenes.forMathematicalExpressionBtn = 3
        Scenes.steps[2+5]()
      }
      const opFour = ()=>{
        

        Scenes.optionsDone[3]=1;
        Scenes.forMathematicalExpressionBtn = 4
        Scenes.steps[3+5]()
      }
      const opFive = ()=>{
        

        Scenes.optionsDone[3]=1;
        Scenes.forMathematicalExpressionBtn = 5
        Scenes.steps[2]()
      }
      options[0].item.onclick = opOne
      rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      rightTicks[2].item.onclick = opThree

      options[3].item.onclick =  opFour
      rightTicks[3].item.onclick = opFour

<<<<<<< Updated upstream
      options[4].item.onclick =  opFive
=======
>>>>>>> Stashed changes
      // ! if all options done then exit
      let exit = true
      for(let i of Scenes.optionsDone){
        if(i==0){
          exit = false
          break
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
      }

      return true;

    }),
    (step4 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.changeHeader(1)
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
        // sliders.changeHeader(2, "Turns Ratio")
      Scenes.items.slider_box.set(-50,-80).scale(0.79)
      Scenes.items.btn_next.show()

      //! Required Items      
      Scenes.items.new_part_3_circuit.set(220,-20,190)
      // Scenes.items.part_3_option_3.set(-30, 155)
       Scenes.items.part3_table_one.set(-45,160, null).scale(0.9)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(640,-78)
      Scenes.items.btn_delete.set(740,-78)
       Scenes.items.btn_reset.set(840,-78)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_one.item
       let tableColumnMax = table.tBodies[0].rows[0].cells.length
       let tableRowMax = table.tBodies[0].rows.length

       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)


      // ! graph
      let graph_height = 200
      let graph_width = 355
      
<<<<<<< Updated upstream
      Scenes.items.graph_box_1.set(null, -28, 210)
      Scenes.items.graph1.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph1.item

      Scenes.items.graph_box_2.set(null, 190, 220)
=======
      Scenes.items.graph_box_1.set(null, -28, 210).zIndex(10)
      Scenes.items.graph1.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph1.item

      Scenes.items.graph_box_2.set(null, 190, 220).zIndex(10)
>>>>>>> Stashed changes
      Scenes.items.graph2.set(null,null,graph_height,graph_width)
      let ctx2 = Scenes.items.graph2.item

      // ! Label for graph
      let xLabel = Scenes.items.chart.label1.x
      let yLabel = Scenes.items.chart.label1.y
      let dataLabel = "Data"

      let xLabel2 = Scenes.items.chart.label2.x
      let yLabel2 = Scenes.items.chart.label2.y
      let dataLabel2 = "Data2"

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      if(Scenes.items.chart[graphIdx] != null){
        Scenes.items.xLabel.set().setContent(xLabel)
        Scenes.items.yLabel.set().setContent(yLabel)

        Scenes.items.xLabel2.set().setContent(xLabel2)
        Scenes.items.yLabel2.set().setContent(yLabel2)
      }
      
      // ! To Plot graph
      function plotGraph(
        ctx,
        ctx2,
        graphIdx,
        data,
        data2,
        dataLabel,
        dataLabel2,
        xLabel=null,
        yLabel=null,
        xLabel2=null,
        yLabel2=null,
        beginAtZero=false
      ){
        // for label
        Scenes.items.yLabel.set(487,60).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
<<<<<<< Updated upstream
        })
=======
        }).zIndex(11)
>>>>>>> Stashed changes
        Scenes.items.xLabel.set(720,160).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
<<<<<<< Updated upstream
        })
=======
        }).zIndex(11)
>>>>>>> Stashed changes
        // for label2
        Scenes.items.yLabel2.set(487,60+225).setContent(yLabel2).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
<<<<<<< Updated upstream
        })
=======
        }).zIndex(11)
>>>>>>> Stashed changes
        Scenes.items.xLabel2.set(720,160+225).setContent(xLabel2).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
<<<<<<< Updated upstream
        })
=======
        }).zIndex(11)
>>>>>>> Stashed changes

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx]
        let graphRef2 = Scenes.items.chart[graphIdx+1]
        if(graphRef!=null){
          graphRef.destroy()
          graphRef2.destroy()
        }
        
        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
        graphRef2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel2,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel2,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel2,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
     
        Scenes.items.chart[graphIdx] = graphRef
        Scenes.items.chart[graphIdx+1] = graphRef2
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      let topMinus = 85
      let leftMinus = 50
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100-leftMinus,78-topMinus,30,30,90).play()
<<<<<<< Updated upstream
        setCC("Select Characteristics")

        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
          setCC("Select V<sub>in</sub>")
        }
          sliders.selectOp2.oninput = ()=>{
            Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
            setCC("Select R")
=======
        setCC("Select V<sub>in</sub>")
        
        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
          setCC("Select R")
        }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
          setCC("Select Turns ratio")
>>>>>>> Stashed changes
          }
            sliders.selectOp3.oninput = ()=>{
              Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
              setCC("Select D")
            }
              sliders.slider.onclick = ()=>{
                Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
                setCC("Press Record")                
              }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      // generate option
      sliders.generateOptionsFor(0)
      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

          
          let graphData = []
          let graphData2 = []
          var rows = table.tBodies[0].rows
          let n = rows.length
          ,xLabel = "Duty Ratio (D)"
          ,yLabel = "Voltage Gain (M)"
          ,xLabel2 = "Duty Ratio (D)"
          ,yLabel2 = "Output voltage (V<sub>0</sub>)",
          tableDutyRatioIdx = 3,
          tableMIdx = 4,
          tableV0Idx = 7
          for(let i=0;i<n;i++){
            let x = rows[i].cells[tableDutyRatioIdx].innerHTML
            let y = rows[i].cells[tableMIdx].innerHTML

            let x2 = rows[i].cells[tableDutyRatioIdx].innerHTML
            let y2 = rows[i].cells[tableV0Idx].innerHTML

            graphData.push({x: x,y: y})
            graphData2.push({x: x2,y: y2})
          }
<<<<<<< Updated upstream
=======
          // ! setDefault two values in it
          function setDefaultLowHighInGraph(graphNumber){
            // D value
            let low = 0, high = 0.95,x = 0,y = 0
            updateValues(sliders.selectOp1.value,low,sliders.selectOp2.value)
            x = low
            if(graphNumber == 1){
              y = Number(Formulas.ideal.M(values)).toFixed(2)
              graphData.unshift({x: x, y: y})
            }else{
              y = Number(Formulas.ideal.v0(values)).toFixed(2)
              graphData2.unshift({x: x, y: y})
            }

            updateValues(sliders.selectOp1.value,high,sliders.selectOp2.value)
            x = high
            if(graphNumber == 1){
              y = Number(Formulas.ideal.M(values)).toFixed(2)
              graphData.push({x: x, y: y})
            }else{
              y = Number(Formulas.ideal.v0(values)).toFixed(2)
              graphData2.push({x: x, y: y})
            }
          }
          setDefaultLowHighInGraph(1)
          setDefaultLowHighInGraph(2)
>>>>>>> Stashed changes

          //for labeling
          let conclusionFront = ""

          conclusionFront = "Voltage gain and output voltage increases with increasing duty ratio. Depending on turns ratio and duty cycle, output voltage is either lower or higher than input voltage."



          // switch(characteristicsValue){

          //   case  'D-vs-M': 
          //     yLabel = "Voltage Gain (M)"
          //     conclusionFront = "The voltage gain linearly increases with increasing duty ratio for ideal case."
          //     setCC("The conclusion of these observations is that the voltage gain linearly increases with increasing duty ratio in ideal case.")
          //     break

          //   case  'D-vs-I': 
          //     yLabel = "I (A)"
          //     conclusionFront = "The load current linearly increases with increasing duty ratio."
          //     setCC("The conclusion of these observation is that the load current linearly increases with increasing duty ratio.")
          //     break

          //   case  'D-vs-V': 
          //     yLabel = "V (V)"
          //     conclusionFront = "The Load voltage linearly increases with increasing duty ratio for ideal case."
          //     setCC("The conclusion of these observation is that the load voltage linearly increases with increasing duty ratio for ideal case.")
          //     break
          // }

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle1.set(null,100).setContent(conclusionFront).addClass("conclusion").item
          // )

            Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item

            setCC("Voltage gain and output voltage increases with increasing duty ratio. Depending on turns ratio and duty cycle, output voltage is either lower or higher than input voltage.")


          
          Scenes.items.chart.label1.x = xLabel
          Scenes.items.chart.label1.y = yLabel

          Scenes.items.chart.label2.x = xLabel2
          Scenes.items.chart.label2.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true)
          Scenes.items.graph1.set(null,null,graph_height,graph_width)
          Scenes.items.graph2.set(null,null,graph_height,graph_width)

      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4

        // ! change the table column index who's changing
        let changeableColumnIndx = 3

        recordBtnClickIdx = 8
        let rows = table.tBodies[0].rows
      
        // * to get old values from table for matching
        for(let i=0;i<tableColumnMax;i++){
          let val = rows[i].cells[changeableColumnIndx].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
        Scenes.items.graph1.set(null,null,graph_height,graph_width)
        Scenes.items.graph2.set(null,null,graph_height,graph_width)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
          return
        }
        let row = table.tBodies[0].rows
        
        for(let i=1;i<tableColumnMax;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableAll()
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
  
        for(let i=0;i<tableRowMax;i++){
          for(let j=1;j<tableColumnMax;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        for(let i=0;i<tableRowMax;i++){
          rows[i].cells[0].innerHTML = i+1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[5]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 

        // taking values from all sliders 
        let vInValue = Number(sliders.selectOp1.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)



        // * if all values not selected
        if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
          setCC("Select all values first.")
          return
        }

        updateValues(vInValue,dutyRatioValue,resistanceValue)
        
        // ! for arrow system
        if(recordBtnClickIdx < tableRowMax-1){
          Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
<<<<<<< Updated upstream
=======
          setCC("Select D.")
>>>>>>> Stashed changes
        }
        else{
          Dom.setBlinkArrowRed(-1)
        }

        // ! Can't select same values
        if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=8){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=8
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[8].innerHTML)
                    let val2 = Number(rows[j+1].cells[8].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }


      
        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          sliders.disable(0,1,2)
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = resistanceValue
        tableRow.cells[3].innerHTML = dutyRatioValue
        tableRow.cells[4].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.nonIdeal.iIn(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.ideal.i0(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.ideal.p0(values)).toFixed(2)

        //!previous values 
        // tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==8){
          setCC("Press Record")
          Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
        }
      }    
       
      

      
      return true
    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "",
        ""
      );
      Scenes.changeHeader(2)
      // setCC("Record 7 reading for 3 different load resistances.")
      // ! show the slider
      Scenes.items.slider_box.set(-50,-80).scale(0.79)
      Scenes.items.btn_next.show()

      //! Required Items
      Scenes.items.new_part_3_circuit.set(220,-20,190)
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_3.set(-30, 155)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(640,-78)
      Scenes.items.btn_delete.set(740,-78)
       Scenes.items.btn_reset.set(840,-78)
      // Scenes.items.part3_table_three.set(20)
      Scenes.items.part3_table_two.set(-43,160, null).scale(0.9)

       let table = Scenes.items.part3_table_two.item
       let tableColumnMax = table.tBodies[0].rows[0].cells.length
       let tableRowMax = table.tBodies[0].rows.length

       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      
      // ! graph
      let graph_height = 200
      let graph_width = 355
      
<<<<<<< Updated upstream
      Scenes.items.graph_box_3.set(null, -28, 210)
      Scenes.items.graph3.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph3.item

      Scenes.items.graph_box_4.set(null, 190, 220)
=======
      Scenes.items.graph_box_3.set(null, -28, 210).zIndex(10)
      Scenes.items.graph3.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph3.item

      Scenes.items.graph_box_4.set(null, 190, 220).zIndex(10)
>>>>>>> Stashed changes
      Scenes.items.graph4.set(null,null,graph_height,graph_width)
      let ctx2 = Scenes.items.graph4.item

      // ! Label for graph
      let xLabel = Scenes.items.chart.label3.x
      let yLabel = Scenes.items.chart.label3.y
      let dataLabel = "Data"

      let xLabel2 = Scenes.items.chart.label4.x
      let yLabel2 = Scenes.items.chart.label4.y
      let dataLabel2 = "Data2"

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 2
      if(Scenes.items.chart[graphIdx] != null){
        Scenes.items.xLabel.set().setContent(xLabel)
        Scenes.items.yLabel.set().setContent(yLabel)

        Scenes.items.xLabel2.set().setContent(xLabel2)
        Scenes.items.yLabel2.set().setContent(yLabel2)
      }
      
      // ! To Plot graph
      function plotGraph(
        ctx,
        ctx2,
        graphIdx,
        data,
        data2,
        dataLabel,
        dataLabel2,
        xLabel=null,
        yLabel=null,
        xLabel2=null,
        yLabel2=null,
        beginAtZero=false
      ){
        // for label
        let yStyle = {
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        }
        let xStyle = {
          backgroundColor: "transperant",
          color: "black",          
          width: "fit-content",
        }
<<<<<<< Updated upstream
        Scenes.items.yLabel.set(487,80).setContent(yLabel).styles(yStyle)
        Scenes.items.xLabel.set(700,160).setContent(xLabel).styles(xStyle)        // for label2
        Scenes.items.yLabel2.set(487,80+225).setContent(yLabel2).styles(yStyle)
        Scenes.items.xLabel2.set(700,160+225).setContent(xLabel2).styles(xStyle)
=======
        Scenes.items.yLabel.set(487,80).setContent(yLabel).styles(yStyle).zIndex(11)
        Scenes.items.xLabel.set(700,160).setContent(xLabel).styles(xStyle).zIndex(11)       // for label2
        Scenes.items.yLabel2.set(487,80+225).setContent(yLabel2).styles(yStyle).zIndex(11)
        Scenes.items.xLabel2.set(700,160+225).setContent(xLabel2).styles(xStyle).zIndex(11)
>>>>>>> Stashed changes

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx]
        let graphRef2 = Scenes.items.chart[graphIdx+1]
        if(graphRef!=null){
          graphRef.destroy()
          graphRef2.destroy()
        }
        
        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
        graphRef2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel2,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel2,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel2,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
     
        Scenes.items.chart[graphIdx] = graphRef
        Scenes.items.chart[graphIdx+1] = graphRef2
      }

      // for adding new datasets to graph
      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: false,
              borderColor: bgColor,
              backgroundColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          console.log(data)
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }


      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      let topMinus = 85
      let leftMinus = 50
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100-leftMinus,78-topMinus,30,30,90).play()
<<<<<<< Updated upstream
        setCC("Select Characteristics")

        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
          setCC("Select V<sub>in</sub>")
        }
          sliders.selectOp2.oninput = ()=>{
            Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
            setCC("Select R")
=======
        setCC("Select V<sub>in</sub>")
        
        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
          setCC("Select R")
        }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
          setCC("Select Turns ratio")
>>>>>>> Stashed changes
          }
            sliders.selectOp3.oninput = ()=>{
              Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
              setCC("Select D")
            }
              sliders.slider.onclick = ()=>{
                Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
                setCC("Press Record")                
              }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      // generate option
      sliders.generateOptionsFor(1)
      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;
       
        let graphData = []
        let graphData2 = []
        var rows = table.tBodies[0].rows
        let n = rows.length
        ,xLabel = "Duty Ratio (D)"
        ,yLabel = "Voltage Gain (M)"
        ,xLabel2 = "Duty Ratio (D)"
        ,yLabel2 = "Output voltage (V<sub>0</sub>)",
        tableDutyRatioIdx = 3,
        tableMIdx = 4,
        tableV0Idx = 7
        for(let i=0;i<n;i++){
          let x = rows[i].cells[tableDutyRatioIdx].innerHTML
          let y = rows[i].cells[tableMIdx].innerHTML

          let x2 = rows[i].cells[tableDutyRatioIdx].innerHTML
          let y2 = rows[i].cells[tableV0Idx].innerHTML

          graphData.push({x: x,y: y})
          graphData2.push({x: x2,y: y2})
        }
<<<<<<< Updated upstream
=======
        // ! setDefault two values in it
        function setDefaultLowHighInGraph(graphNumber){
          // D value
          let low = 0.1, high = 0.95,x = 10,y = 10

          updateValues(values.vIn,low,values.R)
          x = low
          if(graphNumber == 1){
            y = Number(Formulas.nonIdeal.M(values,"low1")).toFixed(2)
            graphData.unshift({x: x, y: y})
          }else{
            y = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
            graphData2.unshift({x: x, y: y})
          }
          updateValues(values.vIn,high,values.R)
          x = high
          if(graphNumber == 1){
            y = Number(Formulas.nonIdeal.M(values)).toFixed(2)
            graphData.push({x: x, y: y})
          }else{
            y = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
            graphData2.push({x: x, y: y})
          }
        }
        setDefaultLowHighInGraph(1)
        setDefaultLowHighInGraph(2)
>>>>>>> Stashed changes

          // for loop fix
          let conclusionFront = ""

          conclusionFront = "Voltage gain and output voltage increases with increasing duty ratio upto certain duty ratio and then starts decreasing. Depending on turns ratio and duty cycle, output voltage is either lower or higher than input voltage."

<<<<<<< Updated upstream
          setCC("Voltage gain and output voltage increases with increasing duty ratio upto certain duty ratio and then starts decreasing. Depending on turns ratio and duty cycle, output voltage is either less or greater than input voltage.",3)
=======
          setCC("Voltage gain and output voltage increases with increasing duty ratio upto certain duty ratio and then starts decreasing.")
          setCC("Depending on turns ratio and duty cycle, output voltage is either less or greater than input voltage.",3)
>>>>>>> Stashed changes
          

          // switch(characteristicsValue){

          //   case  'D-vs-M': 
          //     yLabel = "M (D)"
          //     dataLabel1 = "M(D) non-ideal"
          //     dataLabel2 = "M(D) ideal"
          //     conclusionFront = "Voltage gain depends on the load resistance and  non-ideal voltage gain is lesser than ideal voltage gain due to voltage drops in various components."
          //     setCC("The conclusion of these observation is that Voltage gain depends on the load resistance and  non-ideal voltage gain is lesser than ideal voltage gain due to voltage drops in various components.",3)
          //     break

          //   case  'D-vs-I': 
          //     yLabel = "I<sub>0</sub> (A)"
          //     dataLabel1 = "I₀ (A) non-ideal"
          //     dataLabel2 = "I₀ (A) ideal"
          //     conclusionFront = "The load current linearly increases with increasing duty ratio."
          //     setCC("The conclusion of these observation is that the load current linearly increases with increasing duty ratio.",3)
          //     break

          //   case  'D-vs-V': 
          //     yLabel = "V<sub>0</sub> (V)"
          //     dataLabel1 = "V₀ (V) non-ideal"
          //     dataLabel2 = "V₀ (V) ideal"
          //     conclusionFront = "Load voltage depends on the load resistance and  non-ideal load voltage is lesser than ideal load voltage due to voltage drops in various components."
          //     setCC("The conclusion of these observation is that load voltage depends on the load resistance and  non-ideal load voltage is lesser than ideal load voltage due to voltage drops in various components.",3)
          //     break
          // }

          // ! For front conclusion
          // Anime.fade(
            //   Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item,1,13
            //   )
            
          Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item

          Scenes.items.chart.label3.x = xLabel
          Scenes.items.chart.label3.y = yLabel

          Scenes.items.chart.label4.x = xLabel2
          Scenes.items.chart.label4.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true)
          Scenes.items.graph3.set(null,null,graph_height,graph_width)
          Scenes.items.graph4.set(null,null,graph_height,graph_width)

      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4

        // ! change the table column index who's changing
        let changeableColumnIndx = 3

        recordBtnClickIdx = 8
        let rows = table.tBodies[0].rows
      
        // * to get old values from table for matching
        for(let i=0;i<tableColumnMax;i++){
          let val = rows[i].cells[changeableColumnIndx].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
        Scenes.items.graph3.set(null,null,graph_height,graph_width)
        Scenes.items.graph4.set(null,null,graph_height,graph_width)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
          return
        }
        let row = table.tBodies[0].rows
        
        for(let i=1;i<tableColumnMax;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableAll()
          stepTutorial2()
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
  
        for(let i=0;i<tableRowMax;i++){
          for(let j=1;j<tableColumnMax;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        for(let i=0;i<tableRowMax;i++){
          rows[i].cells[0].innerHTML = i+1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[6]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 

        // taking values from all sliders 
        let vInValue = Number(sliders.selectOp1.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)



        // * if all values not selected
        if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
          setCC("Select all values first.")
          return
        }

        updateValues(vInValue,dutyRatioValue,resistanceValue)
        console.log(vInValue,dutyRatioValue,resistanceValue)
        
        // ! for arrow system
        if(recordBtnClickIdx < tableRowMax-1){
          Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
<<<<<<< Updated upstream
=======
          setCC("Select D")
>>>>>>> Stashed changes
        }
        else{
          Dom.setBlinkArrowRed(-1)
        }

        // ! Can't select same values
        if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=8){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=8
<<<<<<< Updated upstream
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[8].innerHTML)
                    let val2 = Number(rows[j+1].cells[8].innerHTML)
=======
            let sortIndex = 3
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[sortIndex].innerHTML)
                    let val2 = Number(rows[j+1].cells[sortIndex].innerHTML)
>>>>>>> Stashed changes
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }


      
        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          sliders.disable(0,1,2)
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = resistanceValue
        tableRow.cells[3].innerHTML = dutyRatioValue
        tableRow.cells[4].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.nonIdeal.iIn(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.nonIdeal.i0(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.nonIdeal.p0(values)).toFixed(2)

        //!previous values 
        // tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==8){
          setCC("Press Record")
          Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
        }
      }      
      
      
      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        ""
      )

      Scenes.changeHeader(3)
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
      Scenes.items.slider_box.set(-50,-80).scale(0.79)
        Scenes.items.btn_next.show()
  
        //! Required Items
        Scenes.items.new_part_3_circuit.set(220,-20,190)
        Scenes.items.btn_record.set(640,-78)
      Scenes.items.btn_delete.set(740,-78)
       Scenes.items.btn_reset.set(840,-78)
        let table = Scenes.items.part3_table_three.set(-25,165, null).scale(0.9).item
        let tableColumnMax = table.tBodies[0].rows[0].cells.length
        let tableRowMax = table.tBodies[0].rows.length
  
        let valuesToMatch = []
        // * index to handle records
        let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
        
        // ! graph
        let graph_height = 200
        let graph_width = 355
        
<<<<<<< Updated upstream
        Scenes.items.graph_box_5.set(null, -28, 210)
        Scenes.items.graph5.set(null,null,graph_height,graph_width)
        let ctx = Scenes.items.graph5.item

        Scenes.items.graph_box_6.set(null, 190, 220)
=======
        Scenes.items.graph_box_5.set(null, -28, 210).zIndex(10)
        Scenes.items.graph5.set(null,null,graph_height,graph_width)
        let ctx = Scenes.items.graph5.item

        Scenes.items.graph_box_6.set(null, 190, 220).zIndex(10)
>>>>>>> Stashed changes
        Scenes.items.graph6.set(null,null,graph_height,graph_width)
        let ctx2 = Scenes.items.graph6.item

        // ! Label for graph
        let xLabel = Scenes.items.chart.label5.x
        let yLabel = Scenes.items.chart.label5.y
        let dataLabel = "Data"

        let xLabel2 = Scenes.items.chart.label6.x
        let yLabel2 = Scenes.items.chart.label6.y
        let dataLabel2 = "Data2"

        // ! Forshowing graph labels
        // graph idx is for  showing which graph is being shown
        let graphIdx = 0
        if(Scenes.items.chart[graphIdx] != null){
          Scenes.items.xLabel.set().setContent(xLabel)
          Scenes.items.yLabel.set().setContent(yLabel)

          Scenes.items.xLabel2.set().setContent(xLabel2)
          Scenes.items.yLabel2.set().setContent(yLabel2)
        }
        
        // ! To Plot graph
        function plotGraph(
          ctx,
          ctx2,
          graphIdx,
          data,
          data2,
          dataLabel,
          dataLabel2,
          xLabel=null,
          yLabel=null,
          xLabel2=null,
          yLabel2=null,
          beginAtZero=false
        ){
          // for label
          Scenes.items.yLabel.set(487,60).setContent(yLabel).styles({
            backgroundColor: "transperant",
            textAlign: "center",
            color: "black",
            width: "170px", 
            rotate: "-90deg",
<<<<<<< Updated upstream
          })
=======
          }).zIndex(11)
>>>>>>> Stashed changes
          Scenes.items.xLabel.set(720,160).setContent(xLabel).styles({
            backgroundColor: "transperant",
            color: "black",
            width: "fit-content", 
<<<<<<< Updated upstream
          })
=======
          }).zIndex(11)
>>>>>>> Stashed changes
          // for label2
          Scenes.items.yLabel2.set(487,60+225).setContent(yLabel2).styles({
            backgroundColor: "transperant",
            textAlign: "center",
            color: "black",
            width: "170px", 
            rotate: "-90deg",
<<<<<<< Updated upstream
          })
=======
          }).zIndex(11)
>>>>>>> Stashed changes
          Scenes.items.xLabel2.set(720,160+225).setContent(xLabel2).styles({
            backgroundColor: "transperant",
            color: "black",
            width: "fit-content", 
<<<<<<< Updated upstream
          })
=======
          }).zIndex(11)
>>>>>>> Stashed changes

          // ! Destroy old graph
          let graphRef = Scenes.items.chart[graphIdx]
          let graphRef2 = Scenes.items.chart[graphIdx+1]
          if(graphRef!=null){
            graphRef.destroy()
            graphRef2.destroy()
          }
          
          graphRef = new Chart(ctx, {
            type: "scatter",
            plugins: [{
              // afterDraw: chart => {
              //   var ctx = chart.chart.ctx;
              //   ctx.save();
              //   ctx.textAlign = 'center';
              //   ctx.font = '18px Arial';
              //   ctx.fillStyle = 'black';
              //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              //   ctx.textAlign = 'left';
              //   ctx.font = '10px Arial';
              //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              //   ctx.restore();
              // },
              
            }],
            data: {
              datasets: [
                  {
                    label: dataLabel,
                    fill: false,
                    borderColor: "red",
                    backgroundColor: "red",
                    data: data,
                    display: false,
                  },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: false,
                      labelString: yLabel,
                      fontColor: 'black',
                      fontSize: 17,

                    },
                    ticks: { 
                      beginAtZero:beginAtZero,
                      fontColor: 'black',
                      fontSize: 14,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: false,
                      labelString: xLabel,
                      fontColor: 'black',
                      fontSize: 17,
                    },
                    ticks: { 
                      beginAtZero:beginAtZero,
                      fontColor: 'black',
                      fontSize: 14,
                    }
                  },
                ],
              },
            },
          })
          graphRef2 = new Chart(ctx2, {
            type: "scatter",
            plugins: [{
              // afterDraw: chart => {
              //   var ctx = chart.chart.ctx;
              //   ctx.save();
              //   ctx.textAlign = 'center';
              //   ctx.font = '18px Arial';
              //   ctx.fillStyle = 'black';
              //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              //   ctx.textAlign = 'left';
              //   ctx.font = '10px Arial';
              //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              //   ctx.restore();
              // },
              
            }],
            data: {
              datasets: [
                  {
                    label: dataLabel2,
                    fill: false,
                    borderColor: "red",
                    backgroundColor: "red",
                    data: data2,
                    display: false,
                  },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: false,
                      labelString: yLabel2,
                      fontColor: 'black',
                      fontSize: 17,

                    },
                    ticks: { 
                      beginAtZero:beginAtZero,
                      fontColor: 'black',
                      fontSize: 14,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: false,
                      labelString: xLabel2,
                      fontColor: 'black',
                      fontSize: 17,
                    },
                    ticks: { 
                      beginAtZero:beginAtZero,
                      fontColor: 'black',
                      fontSize: 14,
                    }
                  },
                ],
              },
            },
          })
        
          Scenes.items.chart[graphIdx] = graphRef
          Scenes.items.chart[graphIdx+1] = graphRef2
        }

        // let slidersBox = document.querySelectorAll(".slider")
        // let slidersBox = document.querySelectorAll(".range-slider__range")
        let topMinus = 85
        let leftMinus = 50
        function stepTutorial2(){

          Dom.setBlinkArrowRed(true,100-leftMinus,78-topMinus,30,30,90).play()
<<<<<<< Updated upstream
          setCC("Select Characteristics")

          sliders.selectOp1.oninput = ()=>{
            Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
            setCC("Select V<sub>in</sub>")
          }
            sliders.selectOp2.oninput = ()=>{
              Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
              setCC("Select R")
            }
              sliders.selectOp3.oninput = ()=>{
                Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
                setCC("Select D")
=======
          setCC("Select V<sub>in</sub>")
          
          sliders.selectOp1.oninput = ()=>{
            Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
            setCC("Select D")
          }
          sliders.selectOp2.oninput = ()=>{
            Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
            setCC("Select Turns ratio")
            }
              sliders.selectOp3.oninput = ()=>{
                Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
                setCC("Select R")
>>>>>>> Stashed changes
              }
                sliders.slider.onclick = ()=>{
                  Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
                  setCC("Press Record")                
                }
        }
        if(recordBtnClickIdx == 0){
          stepTutorial2()
        }
        // generate option
        sliders.generateOptionsFor(2)
  
        
        function setDataToGraph(){
  
          let characteristicsValue = Scenes.items.slider_C.item.value;
  
         
          let graphData = []
          let graphData2 = []
          var rows = table.tBodies[0].rows
          let n = rows.length
          ,xLabel = "Output Power P<sub>0</sub>"
          ,yLabel = "Losses (W)"
          ,xLabel2 = "Output Power P<sub>0</sub>"
          ,yLabel2 = "Efficiency (%)",
          tableP0Idx = 8,
          tableEfficiency = 11,
          tableLosses = 10
          for(let i=0;i<n;i++){
            let x = rows[i].cells[tableP0Idx].innerHTML
            let y = rows[i].cells[tableLosses].innerHTML

            let x2 = rows[i].cells[tableP0Idx].innerHTML
            let y2 = rows[i].cells[tableEfficiency].innerHTML

            graphData.push({x: x,y: y})
            graphData2.push({x: x2,y: y2})
          }

            // setting labels
          let conclusionFront = ""

          conclusionFront = "Losses increase with loading effect and hence efficiency decreases."

          setCC("Losses increase with loading effect and hence efficiency decreases.")


          // if(p0vsLosses){
          //   yLabel = "Losses (W)"
          //   conclusionFront = "Losses increase with loading effect."
          //   setCC("The conclusion of these observation is that the losses increase with loading effect.")
          // }else{
          //   yLabel = "Efficiencty (%)"
          //   conclusionFront = "Loading effect the efficiency decreases."
          //   setCC("The conclusion of these observation is that due to loading effect the efficiency decreases.")
          // }

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
          // )
          
<<<<<<< Updated upstream
          Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
=======
          Scenes.items.tempTitle1.addClass("conclusion").set(null,60).setContent(conclusionFront)
>>>>>>> Stashed changes
          Scenes.items.chart.label5.x = xLabel
          Scenes.items.chart.label5.y = yLabel

          Scenes.items.chart.label6.x = xLabel2
          Scenes.items.chart.label6.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,false)
          Scenes.items.graph5.set(null,null,graph_height,graph_width)
          Scenes.items.graph6.set(null,null,graph_height,graph_width)
        }

            // ! ------------> If data already present plot the graph
        if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
          setIsProcessRunning(false)
          Scenes.currentStep = 4
  
          // ! change the table column index who's changing
          let changeableColumnIndx = 3
  
          recordBtnClickIdx = 8
          let rows = table.tBodies[0].rows
        
          // * to get old values from table for matching
          for(let i=0;i<tableColumnMax;i++){
            let val = rows[i].cells[changeableColumnIndx].innerHTML
            valuesToMatch.push(Number(val))
          }
        }else{
          // ! Please note this when plot the graph then show the graph ... 
          plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
          Scenes.items.graph5.set(null,null,graph_height,graph_width)
          Scenes.items.graph6.set(null,null,graph_height,graph_width)
          // disableSlider("reset")
        }
  
        // // ! adding data set
        // graph.addDataset(
        //   "Efficiency",
        //   "red",
        //   []
        // )
         
  
         //!onclick for delete btn
         Scenes.items.btn_delete.item.onclick =  function(){
          if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
            return
          }
          let row = table.tBodies[0].rows
          
          for(let i=1;i<tableColumnMax;i++){
            row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
          }
          recordBtnClickIdx = recordBtnClickIdx-1
          if(recordBtnClickIdx==0){
            sliders.enableAll()
          }
          valuesToMatch.pop()
        }
  
        //! onclick for reset 
        Scenes.items.btn_reset.item.onclick = function(){
          var rows = table.tBodies[0].rows
    
          for(let i=0;i<tableRowMax;i++){
            for(let j=1;j<tableColumnMax;j++){
              rows[i].cells[j].innerHTML = "";
            }
          }
  
          for(let i=0;i<tableRowMax;i++){
            rows[i].cells[0].innerHTML = i+1;
          }
  
          // reset all the parameters
          // so just simply call this step again
          Scenes.steps[7]()        
          
        }
  
        // ! onclick for record
        Scenes.items.btn_record.item.onclick = function(){ 
  
          // taking values from all sliders 
          // ! note dutyratio slider is now Resistance Slider and resistance is duty
          let vInValue = Number(sliders.selectOp1.value)
          let dutyRatioValue = Number(sliders.selectOp2.value)
          let resistanceValue = Number(sliders.slider.value)
  
          // * if all values not selected
          if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
            setCC("Select all values first.")
            return
          }
  
          updateValues(vInValue,dutyRatioValue,resistanceValue)
          console.log(vInValue,dutyRatioValue,resistanceValue)

          
          // ! for arrow system
          if(recordBtnClickIdx < tableRowMax-1){
<<<<<<< Updated upstream
=======
            setCC("Select R")
>>>>>>> Stashed changes
            Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
          }
          else{
            Dom.setBlinkArrowRed(-1)
          }
  
          // ! Can't select same values
          if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(resistanceValue)!=-1){
            setCC("Please select different value.")
            return
          }else{
            valuesToMatch.push(resistanceValue)
          }
  
          // ! sort the data
          if(recordBtnClickIdx>=8){
  
            function sortTable(){
              var rows = table.tBodies[0].rows
              let sortAccording = 3
  
              let n=8
              for(let i=0;i<n;i++){
                  for(let j=0;j<n-i-1;j++){
                      let val1 = Number(rows[j].cells[sortAccording].innerHTML)
                      let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
                      if(val1 > val2){
                          let temp = rows[j].innerHTML
                          rows[j].innerHTML = rows[j+1].innerHTML
                          rows[j+1].innerHTML = temp
                      }
                  }
              }
              for(let i=0;i<n;i++){
                  rows[i].cells[0].innerHTML = i+1
              }
            }
            sortTable()
  
            // * plot the graph
            // adding parameter to x,y graph
            // var rows = table.tBodies[0].rows
            // let n = 7
            // for(let i=0;i<n;i++){
            //   graph.addData(0,
            //     {
            //       x: rows[i].cells[9].innerHTML,
            //       y: rows[i].cells[10].innerHTML
            //     }
            //   )
            // }
            setDataToGraph()
            Scenes.items.graph2.set(null,null,220,355)

  
            // after complete
            Dom.setBlinkArrow(true, 790, 408).play()
            setCC("Click 'Next' to go to next step")
            setIsProcessRunning(false)
            Scenes.currentStep = 4
          }
  
  
          
  
          // deactivate the sliders after first value  done
          // todo
          if(recordBtnClickIdx == 0){
            sliders.disable(0,1,2)
          }

          let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
          tableRow.cells[1].innerHTML = vInValue
          tableRow.cells[2].innerHTML = dutyRatioValue
          tableRow.cells[3].innerHTML = resistanceValue
          tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
          tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
          tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
          tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
          tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
          tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
          tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.losses(values)).toFixed(2)
          tableRow.cells[11].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)
  
          // let x = tableRow.cells[9].innerHTML
          // let y = tableRow.cells[10].innerHTML
          // // ! addData to graph
          // graph.addData(0,{x:x,y:y})
  
          // if(recordBtnClickIdx>6){
          //   // after complete
          //   Dom.setBlinkArrow(true, 790, 408).play();
          //   setCC("Click 'Next' to go to next step");
          //   setIsProcessRunning(false); 
          //   Scenes.currentStep = 4
          // }
          // warning for sorting the data
          if(recordBtnClickIdx==8){
            setCC("Press Record")
          Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
          }
        }    
         
        
  
        
      
      return true
    }),
    (step7 = function () {
      setIsProcessRunning(true);
      
      Scenes.setStepHeading(
        "",
        ""
      )
      // componenet stress

      Scenes.changeHeader(4)
        // ! show the slider
      Scenes.items.slider_box.set(25,15).scale(0.95)
      Scenes.items.btn_next.show()

      //! Required Items
      Scenes.items.btn_record.set(240,-60)
      Scenes.items.btn_delete.set(340,-60)
       Scenes.items.btn_reset.set(440,-60)
       // ! graph
      
       sliders.generateOptionsFor(3)
      //  Scenes.items.part4_table_graph.set(0,160,250,555)
<<<<<<< Updated upstream
       Scenes.items.new_part_3_4_circuit.set(0,180,190,290)
       Scenes.items.new_part_3_4_ratings.set(290,160,250,280)
=======
       Scenes.items.new_part_3_4_circuit.set(0,220,190,290)
       Scenes.items.new_part_3_4_ratings.set(290,210,250,280)
>>>>>>> Stashed changes
       //graph labels
       let st_label = {
        backgroundColor: "white",
        color: "black",
        fontSize: "20px",
        width: "300px",
        textAlign: "center",
        margin: "0",
        
       }
       
<<<<<<< Updated upstream
       let l1 = "<span>i<sub>s</sub></span> <span>i<sub>d</sub></span> <span>i<sub>c</sub></span>"
       let l2 = "<span>v<sub>s</sub></span> <span>v<sub>d</sub></span> <span>v<sub>c</sub></span>"
       Scenes.items.tempTitle51.set(620,118).setContent(l1).styles(st_label).addClass("graph_labels")
       Scenes.items.tempTitle52.set(620,364).setContent(l2).styles(st_label).addClass("graph_labels")
=======
       let l2 = "<span>i<sub>s</sub></span> <span>i<sub>d</sub></span> <span>i<sub>c</sub></span>"
       let l1 = "<span>v<sub>s</sub></span> <span>v<sub>d</sub></span> <span>v<sub>c</sub></span>"
       Scenes.items.tempTitle51.set(620,118).setContent(l1).styles(st_label).addClass("graph_labels").zIndex(11)
       Scenes.items.tempTitle52.set(620,364).setContent(l2).styles(st_label).addClass("graph_labels").zIndex(11)
>>>>>>> Stashed changes

       // temp label for the table
       let st = {
        width: "fit-content"
       }
       let st3 = {
        ...st,
        fontSize: "15px"
       }
       let leftMinus = 44, topMinus = 25
       let format_1 = "(V<sub>in</sub>+V<sub>o</sub>/n) V/I<sub>in</sub> A"
<<<<<<< Updated upstream
       let format_2 = "(nV<sub>in</sub>+V<sub>o</sub>) V/I<sub>L,p</sub>/N A"
       let format_3 = "V<sub>o</sub> V/ (∆I<sub>Lm</sub>/2)/N A"
       Scenes.items.tempTitle53.set(443-leftMinus,253-topMinus).setContent(format_1).styles(st)
       Scenes.items.tempTitle54.set(443-leftMinus,300-topMinus).setContent(format_2).styles(st)
       Scenes.items.tempTitle55.set(443-leftMinus,355-topMinus).setContent(format_3).styles(st3)
       let graphIdx = 6
       
      let graph_box7 = new Dom(".graph_box7")
      let graph_box8 = new Dom(".graph_box8")
=======
       let format_2 = "(nV<sub>in</sub>+V<sub>o</sub>) V/I<sub>L,p</sub>/n A"
       let format_3 = "V<sub>o</sub> V/ (∆I<sub>Lm</sub>/2)/n A"
       Scenes.items.tempTitle53.set(443-leftMinus,253-topMinus+50).setContent(format_1).styles(st)
       Scenes.items.tempTitle54.set(443-leftMinus,300-topMinus+50).setContent(format_2).styles(st)
       Scenes.items.tempTitle55.set(443-leftMinus,355-topMinus+50).setContent(format_3).styles(st3)
       let graphIdx = 6
       
      let graph_box7 = new Dom(".graph_box7").zIndex(10)
      let graph_box8 = new Dom(".graph_box8").zIndex(10)
>>>>>>> Stashed changes
      Scenes.items.graph7.set(null,null,250,355)
      Scenes.items.graph8.set(null,200,250,355)
      graph_box7.set()
      graph_box8.set(null,171)
      let ctx1 = Scenes.items.graph7.item
      let ctx2 = Scenes.items.graph8.item
      let chart1 = Scenes.items.chart[graphIdx]
      let chart2 = Scenes.items.chart[graphIdx+1]
      
      let xLabel = ""
      let yLabel = ""

      function plotGraph(){
        if(chart1!=null){
          chart1.destroy()
          chart2.destroy()
        }
        
        chart1 = new Chart(ctx1,
          {
            type: "bar",
            data: {
              labels: ["", "", ""],
              datasets: [
                {
                  backgroundColor: ['red','green','purple'],
                  // data: [10,10,20],
                },
              ]
            },
            plugins: [{
              afterDraw: chart => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.font = '20px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('v                   v                  v', chart.chart.width - 170, chart.chart.height - 32);
                ctx.textAlign = 'left';
                ctx.font = '12px Arial';
                ctx.fillText('S                               D                               C', chart.chart.width - 275, chart.chart.height - 27);
                ctx.restore();
              },
              
            }],
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false
              },
              title:{
                display: true,
                text: "Voltage Stress",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
              },
            },
          }
        )
        chart2 = new Chart(ctx2,
          {
            type: "bar",
            data: {
              labels: ["", "", ""],
              datasets: [
                {
                  backgroundColor: ['red','green','purple'],
                  // data: [10,10,20],
                },
              ]
            },
            plugins: [{
              afterDraw: chart => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.font = '20px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('i                   i                  i', chart.chart.width - 170, chart.chart.height - 32);
                ctx.textAlign = 'left';
                ctx.font = '12px Arial';
                ctx.fillText('S                               D                             C', chart.chart.width - 275, chart.chart.height - 27);
                ctx.restore();
              },
              
            }],
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false
              },
              title:{
                display: true,
                text: "Current Stress",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
              },
            },
          }  
        )
        Scenes.items.chart[graphIdx] = chart1
        Scenes.items.chart[graphIdx+1] = chart2
        
      }

      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100,78,30,30,90).play() 
<<<<<<< Updated upstream
        setCC("Select Characteristics")

        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,260,78,30,30,90).play()
          setCC("Select V<sub>in</sub>")
        }
          sliders.selectOp2.oninput = ()=>{
            Dom.setBlinkArrowRed(true,430,78,30,30,90).play()
            setCC("Select R")
=======
        setCC("Select V<sub>in</sub>")
        
        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,260,78,30,30,90).play()
          setCC("Select R")
        }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,430,78,30,30,90).play()
          setCC("Select Turns ratio")
>>>>>>> Stashed changes
          }
            sliders.selectOp3.oninput = ()=>{
              Dom.setBlinkArrowRed(true,100,140,30,30,90).play()
              setCC("Select D")
            }
              sliders.slider.onclick = ()=>{
                Dom.setBlinkArrowRed(true,280,-10,30,30,90).play()
                setCC("Press Record")                
              }
      }
      if(chart1 == null){
        stepTutorial2()
      }

      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

       // ! ------------> If data already present plot the graph
        if(chart1 != null){
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }else{
          plotGraph()
          // Scenes.items.graph2.set(null,null,190,355)
          Scenes.items.graph7.set(null,null,250,355)
          Scenes.items.graph8.set(null,200,250,355)
        }   


      // ! onclick for reset
      Scenes.items.btn_reset.item.onclick = function(){
        // reset all the parameters
        // so just simply call this step again
        Scenes.items.chart[graphIdx] = chart1
        Scenes.items.chart[graphIdx+1] = chart2
        Scenes.steps[8]()        
      }
       
       // ! onclick for record
       Scenes.items.btn_record.item.onclick = function(){

         // taking values from all sliders 
        let vInValue = Number(sliders.selectOp1.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)
        let nValue = Number(sliders.selectOp3.value)

        // * if all values not selected
        if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
          setCC("Select all values first.")
          return
        }

        Dom.setBlinkArrowRed(-1)
        updateValues(vInValue,dutyRatioValue,resistanceValue)
 
        // for table data (temp title data)
<<<<<<< Updated upstream
        let v0 = Number(Formulas.stress.v0(values)).toFixed(2)
        let v0byN = Number(Formulas.stress.v0(values) / nValue).toFixed(2)
        let iIn = Number(Formulas.stress.iIn(values)).toFixed(2)
        let iLMPbyN = Number(Formulas.stress.iLMP(values) / nValue).toFixed(2)
        let delILMby2byN = Number((Formulas.stress.delILM(values) / 2) / nValue).toFixed(2)

        console.log(vInValue,dutyRatioValue,resistanceValue)

        let vS = vInValue + v0byN
        let vD = (nValue * vInValue) + v0
        let vC = v0

        let iS = iIn
        let iD = iLMPbyN
        let iC = delILMby2byN
=======
        let v0 = parseFloat(Number(Formulas.stress.v0(values)).toFixed(2))
        let v0byN = parseFloat(Number(Formulas.stress.v0(values) / nValue).toFixed(2))
        let iIn = parseFloat(Number(Formulas.stress.iIn(values)).toFixed(2))
        // ! iLMPbyN !/ nValue
        let iLMPbyN = parseFloat(Number(Formulas.stress.iLMP(values) / nValue).toFixed(2))
        let delILMby2byN = parseFloat(Number((Formulas.stress.delILM(values) / 2) / nValue).toFixed(2))

        console.log(vInValue,dutyRatioValue,resistanceValue)

        let vS = Number(parseFloat(vInValue) + parseFloat(v0byN)).toFixed(2)
        let vD = Number((parseFloat(nValue) * parseFloat(vInValue)) + v0).toFixed(2)
        let vC = Number(v0).toFixed(2)

        let iS = Number(iIn).toFixed(2)
        let iD = Number(iLMPbyN).toFixed(2)
        let iC = Number(delILMby2byN).toFixed(2)
>>>>>>> Stashed changes

        Scenes.items.tempTitle53.setContent(`${vS} V/${iS} A`)
        Scenes.items.tempTitle54.setContent(`${vD} V/${iD} A`)
        Scenes.items.tempTitle55.setContent(`${vC} V/${iC} A`)

        // ! add values to graph
        let graph1_data = [vS,vD,vC]
        let graph2_data = [iS,iD,iC]

        plotGraph()
        graph.addData(chart1,0,graph1_data)
        graph.addData(chart2,0,graph2_data)
        Scenes.items.graph7.set(null,null,250,355)
        Scenes.items.graph8.set(null,200,250,355)
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          // setCC("Click 'Next' to go to next step");
<<<<<<< Updated upstream
          setCC("Bar chart shows the switch, diode and capacitor voltage stresses. Voltage and current rating of these components must be at least equal to values shown by the bar chart.")
=======
          setCC("Bar chart shows the switch, diode and capacitor voltage stresses.")

          setCC("Voltage and current rating of these components must be at least equal to values shown by the bar chart.")
>>>>>>> Stashed changes

          let conclusionFront = "Bar chart shows the switch, diode and capacitor voltage stresses. Voltage and current rating of these components must be at least equal to values shown by the bar chart."

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle20.set().setContent(conclusionFront).addClass("conclusion").zIndex(3).item
          // )
<<<<<<< Updated upstream
          Scenes.items.tempTitle20.set().setContent(conclusionFront).addClass("conclusion").zIndex(3).item
=======
          Scenes.items.tempTitle20.set(3,143,null,570).setContent(conclusionFront).addClass("conclusion").zIndex(3).item
>>>>>>> Stashed changes
          
          setIsProcessRunning(false); 
          Scenes.currentStep = 4

          // ! fix resistance value to its original
          // resistanceSlider.min = 10
          // resistanceSlider.max = 500
          // resistanceSlider.step = 1        
          // resistanceSlider.value = 10
          // resistanceSlider.oninput = ()=>{}
       }    
      

      
      return true
    }),
 
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// * slider
// var rangeSlider = function () {
//   var slider = $(".range-slider"),
//     range = $(".range-slider__range"),
//     value = $(".range-slider__value");

//   slider.each(function () {
//     value.each(function () {
//       var value = $(this).prev().attr("value");
//       $(this).html(value);
//     });

//     range.on("input", function () {
//       $(this).next(value).html(this.value);
//       $(this).next(value).val(this.value);
//     });
//   });63
// };
// $(".resistance-input").on("keyup", () => {
//   let slider = $(".slider_R .range-slider__range");
//   let input = document.querySelector(".resistance-input");

//   let min = 1;
//   let max = Number(slider.attr("max"));
//   // if (input.value < min) {
//   //   input.value = min;
//   // }
//   if (input.value > max) {
//     input.value = max;
//   }
//   slider.val(input.value);
// });
// rangeSlider();

// stepcalling
Scenes.currentStep = 1

Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }

