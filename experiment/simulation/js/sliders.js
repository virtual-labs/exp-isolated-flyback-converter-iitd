const sliders = {
  //to catch the select option header
  selectOpHeader1: document.querySelector(".header_c"),
  selectOpHeader2: document.querySelector(".header_v"),
  selectOpHeader3: document.querySelector(".header_r"),
  selectContainers: document.querySelectorAll(".select-container"),
  //to catch the select option
  selectOp1: document.querySelector(".slider_C"),
  selectOp2: document.querySelector(".slider_vIn"),
  selectOp3: document.querySelector(".slider_R"),
  selectOptions: [],
  selectOpHeaders: [],
  slider: document.querySelector(".slider_D"),
  sliderInput: document.querySelector(".slider_D_input"),
  sliderHeader: document.querySelector(".header_d"),
  
  init(){
    this.selectOptions = [this.selectOp1,this.selectOp2,this.selectOp3]
    this.changeValue()
    this.selectOpHeaders = [this.selectOpHeader1, this.selectOpHeader2, this.selectOpHeader3]
    this.selectOptionsAll = [...this.selectOptions,this.slider]
  },
  setShowOutputOnInput(stepIndex){
    if(stepIndex==3){
      return
    }
    let st = {
      backgroundColor: "white",
      border: "2px solid black",
      color: "black",
      borderRadius: "0",
      width: "fit-content",
      textAlign: "center",
      fontSize: "0.7rem",
    }
    let st2 = {
      ...st,
      padding: "0px 10px",
    }
    // over circuit image output for select options
    let tempTitle30 = new Dom(".temp-title30").set(269,46).setContent("0 V").styles(st)
    let tempTitle31 = new Dom(".temp-title31").set(511,41).setContent("0 R").styles(st)
    let tempTitle32 = new Dom(".temp-title32").set(351,-1).setContent(":").styles(st2)

    let previousOninputFunctions = []
    for(let op of this.selectOptions){
      previousOninputFunctions.push(op.oninput)
    }
    previousOninputFunctions.push(this.slider.onclick)
    
    switch(stepIndex){
      case 0:
      case 1:
        this.selectOp1.oninput = ()=>{
          tempTitle30.setContent(`${this.selectOp1.value} V`)
          previousOninputFunctions[0]()
        }
        this.selectOp2.oninput = ()=>{
          tempTitle31.setContent(`${this.selectOp2.value} R`)
          previousOninputFunctions[1]()
        }
        this.selectOp3.oninput = ()=>{
          tempTitle32.setContent(`${this.selectOp3.value}`)
          previousOninputFunctions[2]()
        }
        break
        
      case 2:
        this.selectOp1.oninput = ()=>{
          previousOninputFunctions[0]()
          tempTitle30.setContent(`${this.selectOp1.value} V`)
        }
        this.slider.onclick = ()=>{
          previousOninputFunctions[3]()
          tempTitle31.setContent(`${this.slider.value} R`)
        }
        this.selectOp3.oninput = ()=>{
          previousOninputFunctions[2]()
          tempTitle32.setContent(`${this.selectOp3.value}`)
        }
    }
  },
  //to change the header of option
  changeHeader(idx, headerTitle) {
    this.selectOpHeaders[idx].innerHTML = headerTitle
  },
  //to change the option in select
  generateOptionsFor(stepIndex) {
    function genOptions(selectEleOpn,opsArr,opsArr2=null){
      let strOps = `<option value="0">Select</option>`;
      for (let ops in opsArr) {
        let ops2 = opsArr[ops]
        if(opsArr2!=null){
          ops2 = opsArr2[ops]
        }
        strOps += `<option value="${opsArr[ops]}">${ops2}</option>`;
      }
      selectEleOpn.innerHTML = strOps;
    }
    if(stepIndex>=0)
      this.setShowOutputOnInput(stepIndex)
    switch(stepIndex){
      case -1:
      case 0:
      case 1:
        this.enableAll()

        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[0],[24,36,48])
        
        this.changeHeader(1,"R (Ω)")
        genOptions(this.selectOptions[1],[12,24,36])

        this.changeHeader(2,"Turns ratio")
        genOptions(this.selectOptions[2],[0.5,2],["1:2","2:1"])

        this.setSlider(0.1,0.9,0.01,"D")
        this.enableAll()
        break

      case 2:
        this.enableAll()
      
        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[0],[24,36,48])
        
        this.changeHeader(1,"D")
        genOptions(this.selectOptions[1],[0.25,0.50,0.75])

        this.changeHeader(2,"Turns ratio")
        genOptions(this.selectOptions[2],[0.5,2],["1:2","2:1"])


        this.setSlider(10, 200, 1, "R (Ω)")
        this.enableAll()
        break
      
      case 3:
        this.enableAll()
      
        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[0],[24,36,48])
        
        this.changeHeader(1,"R (Ω)")
        genOptions(this.selectOptions[1],[12, 24, 36])

        this.changeHeader(2,"Turns ratio")
        genOptions(this.selectOptions[2],[0.5,2],["1:2","2:1"])


        this.setSlider(0.25, 0.75, 0.25, "D")
        this.enableAll()
        break
    }
  },

  changeValue(maxValue) {
    this.slider.oninput = () => {
      this.sliderInput.value = this.slider.value;
    }

    this.sliderInput.onkeyup = () => {
      if (this.slider.value > maxValue) {
        this.slider.value = maxValue;
      }
      this.slider.value = this.sliderInput.value;
    }
  },

  disable(...selectIndex) {
    selectIndex.forEach(index=>{
      if(index==3){
        this.slider.disabled = true
        this.sliderInput.disabled = true
        this.selectContainers[index].classList.add("disabled")
      }else{
        this.selectOptions[index].disabled = true
        this.selectContainers[index].classList.add("disabled")
      }
    })
  },
  enableAll(){
    this.selectOptions.forEach(ele=>{
      ele.disabled = false
    })
    this.selectContainers.forEach(ele=>{
      ele.classList.remove("disabled")
    })
    this.slider.disabled = false
    this.sliderInput.disabled = false
    this.showSliderAndOptions()
  },
  hideSliderAndOption(opsIdx){
    let sliderArr = document.querySelectorAll(".select-container")
    sliderArr[opsIdx].style.display="none"
  },
  showSliderAndOptions(){
    for(let i =0; i<3;i++){
      this.selectContainers[i].style.display = "block"
    }
    this.selectContainers[3].style.display = "flex"
  },

  setSlider(min,max,step,title){
    this.slider.value = min
    this.slider.min = min
    this.slider.max = max
    this.slider.step = step

    this.sliderInput.value = min
    this.sliderInput.min = min
    this.sliderInput.max = max

    this.sliderHeader.innerHTML = title

    this.changeValue(max)
  },
}
sliders.init()
