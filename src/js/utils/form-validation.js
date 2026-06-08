export default function validateForm(inputs){
  inputs.forEach((item) => {
    if(!item.value){
    	throw new Error('Pastikan semua form terisi.')
    }
    // if(inputForm[name="password"].value !== inputForm[name="password-confirm"].value) {
    //   throw new Error('Konfirmasi password tidak sama.')
    // }
    // if (!(inputForm[name="privacy-policy"].checked)) {
    //   throw new Error("Pastikan menceklis privacy dan policy.")
    // }
	});
	return true
}