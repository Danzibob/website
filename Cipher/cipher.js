Palph = "abcdefghijklmnopqrstuvwxyz"
Calph = alph.toUpperCase()
function decode(ciphertext,subAlph){
    plaintext = ""
    for(i in ciphertext){
        var l = Calph.indexOf(ciphertext[i])
        if(i == -1){plaintext += ciphertext[i]}
            else   {plaintext += subAlph[l]}
    }
    return plaintext
}
console.log(decode(pt,sa))
