const Formulas = {  
    one_minus_D(){
        return 1 - values.D
    },


    step2:{
        v0(values){
            let ans = (values.n * values.D * values.vIn)/ Formulas.one_minus_D()
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
        },
        iIn(values){
            let ans = Math.pow((values.n * values.D),2)* values.vIn / values.R * Math.pow(Formulas.one_minus_D(), 2)
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        iIn(values){
            let ans = (
                Math.pow((values.n * values.D), 2) * values.vIn) / (values.R * Math.pow(Formulas.one_minus_D(), 2)
            )

            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },
    },


    ideal:{

        M(values){
            let ans = (values.n * values.D) / Formulas.one_minus_D()
<<<<<<< Updated upstream
            return (ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        v0(values){
            let ans = this.M(values) * values.vIn;
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
        },

        i0(values){
            console.log("i0",values.R)
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        p0(values){
            let ans = Math.pow(this.v0(values), 2) / values.R
            return Number(ans.toFixed(4))
        },
    },
    nonIdeal:{
        
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },

        i0(values){
            let ans = this.v0(values) / values.R
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        p0(values){
            let ans = Math.pow(this.v0(values), 2) / values.R
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
    },
    nonIdeal:{
>>>>>>> Stashed changes
        M(values){
            // new 
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

<<<<<<< Updated upstream
            const  C=100 * micro,Lm= 1 * mini, rsw = 40*mini, rp = 1, rs = 1, vFD=0.2;

            let upper1 = values.n * values.R *( Formulas.one_minus_D()) * (values.D * values.vIn - vFD*(Formulas.one_minus_D()))

            let bottom1 = values.vIn * (values.R + values.n * rs + Math.pow(values.D, 2)* values.R - 2*values.D * values.R - values.n * values.D * rs + Math.pow(values.n, 2) * values.D * rsw + Math.pow(values.n, 2) * values.D * rp)

            
            let ans = upper1 / bottom1  
    
            return Number(ans.toFixed(4))
=======
            const  C=100 * micro,Lm= 1 * mini, rsw = 40*mini, rp = 1, rs = 1, vFD=0.7;

            let upper1 = values.n * values.R *( Formulas.one_minus_D()) * (values.D * values.vIn - vFD*(Formulas.one_minus_D()))

            let bottom1 = values.vIn * (values.R + (values.n * rs) + (Math.pow(values.D, 2)* values.R) - (2*values.D * values.R) - (values.n * values.D * rs) + (Math.pow(values.n, 2) * values.D * rsw) + (Math.pow(values.n, 2) * values.D * rp))

            
            let ans = upper1 / bottom1  
            ans = Number(ans).toFixed(4)
            
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        v0(values){
            let ans = this.M(values) * values.vIn;
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        i0(values){
            let ans = this.v0(values) / values.R
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        iIn(values){
                        
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro
            const  C=100 * micro,Lm= 1 * mini, rsw = 40*mini, rp = 1, rs = 1, vFD=0.2;

            //! vd value remove and update

            let upper1 = Math.pow(values.n, 2)*values. D * (values.D*vFD - vFD + values.D * values.vIn)

            let bottom1 = values.R + values.n * rs + Math.pow(values.D, 2) * values.R  - 2* values.D * values.R - values.n * values.D * rs + Math.pow(values.n, 2) * values.D * rsw + Math.pow(values.n , 2) * values.D * rp


            let ans = upper1/bottom1
            
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        p0(values){
            console.log("p0",values.R)
            let ans = Math.pow(this.v0(values), 2) / values.R
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        i0(values){
            let ans = this.v0(values) / values.R
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        p0(values){
            let ans = Math.pow(this.v0(values), 2) / values.R
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },
    },
    efficiencyPlot:{

        //! Requires v0, M, iIn, i0, p0, Losses, efficiency 
    
        v0(values){
            let ans = this.M(values) * values.vIn;
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        M(values){
            // new 
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const  C=100 * micro,Lm= 1 * mini, rsw = 40*mini, rp = 1, rs = 1, vFD=0.2;

            let upper1 = values.n * values.R *( Formulas.one_minus_D()) * (values.D * values.vIn - vFD*(Formulas.one_minus_D()))

            let bottom1 = values.vIn * (values.R + values.n * rs + Math.pow(values.D, 2)* values.R - 2*values.D * values.R - values.n * values.D * rs + Math.pow(values.n, 2) * values.D * rsw + Math.pow(values.n, 2) * values.D * rp)

            
            let ans = upper1 / bottom1  
    
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        iIn(values){
                        
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro
            const  C=100 * micro,Lm= 1 * mini, rsw = 40*mini, rp = 1, rs = 1, vFD=0.2

            //! vd value remove and update

            let upper1 = Math.pow(values.n, 2) * values.D * (values.D * vFD - vFD + values.D * values.vIn)

            let bottom1 = values.R + values.n * rs + Math.pow(values.D, 2) * values.R  - 2* values.D * values.R - values.n * values.D * rs + Math.pow(values.n, 2) * values.D * rsw + Math.pow(values.n , 2) * values.D * rp

            let ans = upper1 / bottom1
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        i0(values){
            let ans = this.v0(values) / values.R
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        pIn(values){
            let ans = values.vIn * this.iIn(values)
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
        },
        p0(values){
            let ans = Math.pow(this.v0(values), 2) / values.R
            return Number(ans.toFixed(4))
        },
        losses(values){
            let ans = this.pIn(values ) - this.p0(values)
            return Number(ans.toFixed(4))
        },
        eff(values){
            let ans = (this.p0(values) * 100) / this.pIn(values)
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        p0(values){
            let ans = Math.pow(this.v0(values), 2) / values.R
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        losses(values){
            let ans = this.pIn(values ) - this.p0(values)
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },
        eff(values){
            let ans = (this.p0(values) * 100) / this.pIn(values)
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        }
    },
    stress:{
        v0(values){
<<<<<<< Updated upstream
            let ans = values.n * values.D * values.vIn / Formulas.one_minus_D()
            return Number(ans.toFixed(4))
=======
            let ans = (values.n * values.D * values.vIn) / Formulas.one_minus_D()
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        i0(values){
            let ans = this.v0(values) / values.R
<<<<<<< Updated upstream
            return Number(ans.toFixed(4))
        },

        iIn(values){
            let ans =values.n * values.D * this.i0(values) / Formulas.one_minus_D()
            return Number(ans.toFixed(4))
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
        },

        iIn(values){
            let ans = (values.n * values.D * this.i0(values)) / Formulas.one_minus_D()
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        iLM(values){
            let ans = this.iIn(values) / values.D
<<<<<<< Updated upstream
            return Number(ans.toFixed(4));
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        delILM(values){
            let ans = 0.2 * this.iLM(values) 
<<<<<<< Updated upstream
            return Number(ans.toFixed(4));
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },

        iLMP(values){
            let ans = this.iLM(values) + (this.delILM(values) / 2)
<<<<<<< Updated upstream
            return Number(ans.toFixed(4));
=======
            ans = Number(ans).toFixed(4)
            return parseFloat(ans)
>>>>>>> Stashed changes
        },
            
    },
}

let values = {
    vIn:0,
    D:0,
    R:0,
    n:0
}

function updateValues(vIn,D,R){
    values = {
        vIn:vIn,
        D:D,
        R:R,
        n:Number(sliders.selectOp3.value),
    }
}