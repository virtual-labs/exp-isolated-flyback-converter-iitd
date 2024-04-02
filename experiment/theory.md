### Theory

The circuit configuration of flyback converter is given in Fig. 1.

<center>
  <img src="images/th1.png" height="350px">
  
Fig.1 Circuit configuration of Flyback Converter.

</center>
<br>
Based on the operation of switch (Sw: ON/OFF-state) the operating principle of the converter is explained below briefly. 
<br><br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>
  
**Mode – I :  Switch (Sw): ON and Diode (Db): OFF**
<br>
<img src="images/th2.png">
<br><br>
Fig. 2(a) Equivalent circuit in mode- I.
<br><br>
</center>
</td>
<td style="width:50%">

 
<center>
  
**Mode – II :  Switch (Sw): OFF and Diode (Db): ON**
<br>
<img src="images/th3.png">
<br><br>
Fig. 2(b) Equivalent circuit in mode-II.
<br><br>
</center> 
    </td>
  </tr>
</table>
<br>

**a) Voltage conversion ratio or voltage gain (M)**

Voltage across inductor L<sub>m</sub> is:

**Mode – I :**
<br>
<div style="float: left; width:50%;">
  <img src="images/th4.png" height="25px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br><br>

**Mode – II :**
<br>
<div style="float: left; width:50%;">
  <img src="images/th5.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)
      </div>     
<br><br>

Applying volt-sec balance on inductor (eqn. 1 and 2)
<br>

<div style="float: left; width:50%;">
  <img src="images/th6.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>

<br><br>
On solving eqn. 3
<br>

<div style="float: left; width:50%;">
  <img src="images/th7.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;" height="60px">
    ..(4)
  <br>
      </div>
<br>

<div style="float: left; width:100%;"><br>
  
**b) Power balance under ideal condition (neglecting losses):**
<br>
Under ideal condition, input power must be equal to output power, hence

</div>
<br><br>

<div style="float: left; width:50%;">
  <img src="images/th8.png" height="30px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(5)
      </div>
<br><br>
      
<div style="float: left; width:100%;">
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th9.png" height="30px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(6)
      </div>
<br><br>

<div style="float: left; width:100%;"><br>
Substituting eqn. 4 into eqn. 10
<br><br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th10.png" height="30px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(7)
      </div>

<div style="float: left; width:100%;"><br>
  
  **c) Inductor current ripple (Lm):**
<br></div>

<div style="float: left; width:100%;"><br><br>
From eqn. 1
<br><br>
</div>


<div style="float: left; width:50%;">
  <img src="images/th11.png" height="30px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(8)
      </div>
<br>
<div style="float: left; width:100%;"><br>
<br>
Therefore, the inductor ripple current is
<br><br>

</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th12.png" height="30px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(9)
      </div>


<div style="float: left; width:100%;"><br>

**d) Current through various components:**     

The current through various components is given in Fig. 3.

</div>

<center>
  <img src="images/th13.png">
  
Fig. 3 Current through various components.

</center>
<br>


<br>
<div style="float: left; width:100%;"><br>

**e) Voltage and current stress on various components:**

</div>

<br>
<center>
<table align="center" width="100%" >
  <tr style="text-align: center; font-weight: bold; background-color: #c9c9c9;">
    <td style="text-align: center; font-weight: bold;">Component</td>
    <td style="text-align: center; font-weight: bold;">Voltage stress</td>
    <td style="text-align: center; font-weight: bold;">Current Stress</td>
  </tr>
  <tr style="background-color: #c9c9c9;">
    <td>Magnetising Inductor (L<sub>m</sub>)</td>
    <td><img src="images/th14.png" height="60px"></td>
    <td><img src="images/th15.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Capacitor (C)</td>
    <td><img src="images/th16.png" height="60px"></td>
    <td><img src="images/th17.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Switch (S<sub>w</sub>)</td>
    <td><img src="images/th18.png" height="60px"></td>
    <td><img src="images/th19.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Diode (D<sub>b</sub>)</td>
    <td><img src="images/th20.png" height="60px"></td>
    <td><img src="images/th21.png" height="60px"></td>
  </tr>
</table>
</center>
<br>



<br> ===================================== <br>
