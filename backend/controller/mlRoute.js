const { spawn } = require('child_process');

exports.getDisease = async (req,res)=>{
    var validatedInput = inputValidation(req.body.symp1,req.body.symp2,req.body.symp3,req.body.symp4,req.body.symp5);
    console.log(typeof(validatedInput));
    try {
        const output = await run(validatedInput);
        console.log(output)
      } catch (e) {
        console.error('Error during script execution ', e.stack);
      }

    res.send("working");
}


function run(arg1) {
    return new Promise((resolve, reject) => {
      const process = spawn('python', ['../pythonfile/script.py', arg1]);
      const out = []
      process.stdout.on(
        'data',
        (data) => {
          out.push(data.toString());
          
        }
      );
  
  
      const err = []
      process.stderr.on(
        'data',
        (data) => {
          err.push(data.toString());
        }
      );
  
      process.on('exit', (code, signal) => {
        if (code !== 0) {
          reject(new Error(err.join('\n')))
          return
        }
        try {
          resolve(JSON.parse(out[0]));
        } catch(e) {
          reject(e);
        }
      });
    });
  }

// array of diseases
dis_array=["itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting", "burning_micturition", "spotting_ urination", "fatigue", "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level", "cough", "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach", "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements", "loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching", "toxic_look_(typhos)", "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body", "belly_pain", "abnormal_menstruation", "dischromic _patches", "watering_from_eyes", "increased_appetite", "polyuria", "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload.1", "blood_in_sputum", "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples", "blackheads", "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"]



  function inputValidation(sym1,sym2,sym3,sym4,sym5){
    var disease_list = [];
    sym1.toLowerCase().replace(/ /g, "_");
    sym2.toLowerCase().replace(/ /g, "_");
    sym3.toLowerCase().replace(/ /g, "_");
    sym4.toLowerCase().replace(/ /g, "_");
    sym5.toLowerCase().replace(/ /g, "_");

    if(dis_array.includes(sym1)==true){
        disease_list.push(sym1);
    }
    if(dis_array.includes(sym2)==true){
        disease_list.push(sym2);
    }
    if(dis_array.includes(sym3)==true){
        disease_list.push(sym3);
    }
    if(dis_array.includes(sym4)==true){
        disease_list.push(sym4);
    }
    if(dis_array.includes(sym5)==true){
        disease_list.push(sym5);
    }
    var disease_list_string = disease_list.join(",");
    return disease_list_string;
  }



