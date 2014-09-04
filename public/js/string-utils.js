function convert_string_to_hex(s) {
  var byte_arr = [];
  for (var i = 0 ; i<s.length ; i++) {
    var value = s.charCodeAt(i);
    byte_arr.push(value & 255);
    byte_arr.push((value>>8) & 255);
  }
  return convert_to_formated_hex(byte_arr);
}
function is_array(input) {
  return typeof(input) === "object" && (input instanceof Array);
}  
function convert_to_formated_hex(byte_arr) {
  var hex_str = "",
      i,
      len,
      tmp_hex;
  
  if (!is_array(byte_arr)) {
    return false;
  }
  
  len = byte_arr.length;
  
  for (i = 0; i < len; ++i) {
    if (byte_arr[i] < 0) {
      byte_arr[i] = byte_arr[i] + 256;
    }
    if (byte_arr[i] === undefined) {
      alert("Boom " + i);
      byte_arr[i] = 0;
    }
    tmp_hex = byte_arr[i].toString(16);
    
    // Add leading zero.
    if (tmp_hex.length == 1) tmp_hex = "0" + tmp_hex;
    
    if ((i + 1) % 32 === 0) {
      tmp_hex += "\n";
    } else {
      tmp_hex += " ";
    }
    
    hex_str += tmp_hex;
  }
  
  return hex_str.trim();
}

function ab2str(buf) {
  var str = "";
  for (var i=0, strLen=buf.length;i<strLen;i++) {
    str += String.fromCharCode(buf[i<<1]+(buf[(i<<1)+1]<<8));
  }
  return str;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2);
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}