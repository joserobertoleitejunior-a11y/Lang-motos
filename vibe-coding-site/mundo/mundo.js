"use strict";(()=>{var Tu=0,Bl=1,wu=2;var xr=1,Au=2,ws=3,Gn=0,Lt=1,Gt=2,Hi=0,As=1,kn=2,zl=3,Hl=4,Ru=5;var Vi=100,Cu=101,Pu=102,Iu=103,Lu=104,Du=200,Nu=201,Fu=202,Uu=203,Vl=204,Gl=205,Ou=206,Bu=207,zu=208,Hu=209,Vu=210,Gu=211,ku=212,Wu=213,Xu=214,fo=0,ps=1,po=2,ms=3,mo=4,go=5,xo=6,vo=7,kl=0,qu=1,Yu=2,Wn=0,Wl=1,Xl=2,ql=3,vr=4,Yl=5,Zl=6,Jl=7;var $l=300,Gi=301,Rs=302,jo=303,Qo=304,_o=1e3,Mn=1001,yo=1002,At=1003,Zu=1004;var _r=1005;var bt=1006,ea=1007;var li=1008;var dn=1009,Kl=1010,jl=1011,Cs=1012,ta=1013,Nn=1014,wn=1015,Jt=1016,na=1017,ia=1018,ki=1020,Ql=35902,ec=35899,tc=1021,nc=1022,vn=1023,ii=1026,ci=1027,sa=1028,ra=1029,Ri=1030,oa=1031;var aa=1033,yr=33776,Mr=33777,br=33778,Sr=33779,la=35840,ca=35841,ua=35842,ha=35843,da=36196,fa=37492,pa=37496,ma=37488,ga=37489,Er=37490,xa=37491,va=37808,_a=37809,ya=37810,Ma=37811,ba=37812,Sa=37813,Ea=37814,Ta=37815,wa=37816,Aa=37817,Ra=37818,Ca=37819,Pa=37820,Ia=37821,La=36492,Da=36494,Na=36495,Fa=36283,Ua=36284,Tr=36285,Oa=36286;var $s=2300,Mo=2301,uo=2302,Cl=2303,Pl=2400,Il=2401,Ll=2402;var Ju=3200,Ba=3201;var za=0,$u=1,Fn="",Et="srgb",Ks="srgb-linear",js="linear",rt="srgb";var ho=7680;var Ku=519,ju=512,Qu=513,eh=514,ic=515,th=516,nh=517,sc=518,rc=519,oc=35044;var ac="300 es",bn=2e3,gs=2001;function Dd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ih(){let i=Qs("canvas");return i.style.display="block",i}var Wc={},xs=null;function er(...i){let e="THREE."+i.shift();xs?xs("log",e,...i):console.log(e,...i)}function sh(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ue(...i){i=sh(i);let e="THREE."+i.shift();if(xs)xs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Oe(...i){i=sh(i);let e="THREE."+i.shift();if(xs)xs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ys(...i){let e=i.join(" ");e in Wc||(Wc[e]=!0,Ue(...i))}function rh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var oh={[fo]:fo,[po]:xo,[mo]:mo,[ms]:go,[ps]:ps,[xo]:po,[vo]:vo,[go]:ms},Bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var il=Math.PI/180,bo=180/Math.PI;function Wi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function Xe(i,e,t){return Math.max(e,Math.min(t,i))}function Fd(i,e){return(i%e+e)%e}function sl(i,e,t){return(1-t)*i+t*e}function ah(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ha(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function lh(i,e){if(e.constructor===Float32Array)return i;let t=Ha(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function ch(i,e){if(e.constructor===Float32Array)return i;let t=Ha(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var fc=class fc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fc.prototype.isVector2=!0;var ue=fc,vt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],p=n[s+3],d=r[o+0],h=r[o+1],f=r[o+2],v=r[o+3];if(p!==v||l!==d||c!==h||u!==f){let g=l*d+c*h+u*f+p*v;g<0&&(d=-d,h=-h,f=-f,v=-v,g=-g);let m=1-a;if(g<.9995){let _=Math.acos(g),E=Math.sin(_);m=Math.sin(m*_)/E,a=Math.sin(a*_)/E,l=l*m+d*a,c=c*m+h*a,u=u*m+f*a,p=p*m+v*a}else{l=l*m+d*a,c=c*m+h*a,u=u*m+f*a,p=p*m+v*a;let _=1/Math.sqrt(l*l+c*c+u*u+p*p);l*=_,c*=_,u*=_,p*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],p=r[o],d=r[o+1],h=r[o+2],f=r[o+3];return e[t]=a*f+u*p+l*h-c*d,e[t+1]=l*f+u*d+c*p-a*h,e[t+2]=c*f+u*h+a*d-l*p,e[t+3]=u*f-a*p-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),p=a(r/2),d=l(n/2),h=l(s/2),f=l(r/2);switch(o){case"XYZ":this._x=d*u*p+c*h*f,this._y=c*h*p-d*u*f,this._z=c*u*f+d*h*p,this._w=c*u*p-d*h*f;break;case"YXZ":this._x=d*u*p+c*h*f,this._y=c*h*p-d*u*f,this._z=c*u*f-d*h*p,this._w=c*u*p+d*h*f;break;case"ZXY":this._x=d*u*p-c*h*f,this._y=c*h*p+d*u*f,this._z=c*u*f+d*h*p,this._w=c*u*p-d*h*f;break;case"ZYX":this._x=d*u*p-c*h*f,this._y=c*h*p+d*u*f,this._z=c*u*f-d*h*p,this._w=c*u*p+d*h*f;break;case"YZX":this._x=d*u*p+c*h*f,this._y=c*h*p+d*u*f,this._z=c*u*f-d*h*p,this._w=c*u*p-d*h*f;break;case"XZY":this._x=d*u*p-c*h*f,this._y=c*h*p-d*u*f,this._z=c*u*f+d*h*p,this._w=c*u*p+d*h*f;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],p=t[10],d=n+a+p;if(d>0){let h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(n>a&&n>p){let h=2*Math.sqrt(1+n-a-p);this._w=(u-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>p){let h=2*Math.sqrt(1+a-n-p);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+u)/h}else{let h=2*Math.sqrt(1+p-n-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},pc=class pc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),p=2*(r*n-o*t);return this.x=t+l*c+o*p-a*u,this.y=n+l*u+a*c-r*p,this.z=s+l*p+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return rl.copy(this).projectOnVector(e),this.sub(rl)}reflect(e){return this.sub(rl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};pc.prototype.isVector3=!0;var P=pc,rl=new P,Xc=new vt,mc=class mc{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],p=n[7],d=n[2],h=n[5],f=n[8],v=s[0],g=s[3],m=s[6],_=s[1],E=s[4],y=s[7],w=s[2],T=s[5],x=s[8];return r[0]=o*v+a*_+l*w,r[3]=o*g+a*E+l*T,r[6]=o*m+a*y+l*x,r[1]=c*v+u*_+p*w,r[4]=c*g+u*E+p*T,r[7]=c*m+u*y+p*x,r[2]=d*v+h*_+f*w,r[5]=d*g+h*E+f*T,r[8]=d*m+h*y+f*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],p=u*o-a*c,d=a*l-u*r,h=c*r-o*l,f=t*p+n*d+s*h;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/f;return e[0]=p*v,e[1]=(s*c-u*n)*v,e[2]=(a*n-s*o)*v,e[3]=d*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=h*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ol.makeScale(e,t)),this}rotate(e){return Ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ol.makeRotation(-e)),this}translate(e,t){return Ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ol.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};mc.prototype.isMatrix3=!0;var ze=mc,ol=new ze,qc=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ud(){let i={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fn?js:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ks]:{primaries:e,whitePoint:n,transfer:js,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:qc,fromXYZ:Yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),i}var $e=Ud();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ji,So=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ji===void 0&&(Ji=Qs("canvas")),Ji.width=e.width,Ji.height=e.height;let s=Ji.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ni(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Od=0,vs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(al(s[o].image)):r.push(al(s[o]))}else r=al(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function al(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?So.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}var Bd=0,ll=new P,Yt=class i extends Bn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=bt,o=li,a=vn,l=dn,c=i.DEFAULT_ANISOTROPY,u=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=Wi(),this.name="",this.source=new vs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ll).x}get height(){return this.source.getSize(ll).y}get depth(){return this.source.getSize(ll).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _o:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _o:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=$l;Yt.DEFAULT_ANISOTROPY=1;var gc=class gc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],p=l[8],d=l[1],h=l[5],f=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(p-v)<.01&&Math.abs(f-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(p+v)<.1&&Math.abs(f+g)<.1&&Math.abs(c+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,y=(h+1)/2,w=(m+1)/2,T=(u+d)/4,x=(p+v)/4,b=(f+g)/4;return E>y&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=x/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=b/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=x/r,s=b/r),this.set(n,s,r,t),this}let _=Math.sqrt((g-f)*(g-f)+(p-v)*(p-v)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(g-f)/_,this.y=(p-v)/_,this.z=(d-u)/_,this.w=Math.acos((c+h+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};gc.prototype.isVector4=!0;var lt=gc,Eo=class extends Bn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Yt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new vs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zt=class extends Eo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},tr=class extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var To=class extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ko=class Ko{constructor(e,t,n,s,r,o,a,l,c,u,p,d,h,f,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,p,d,h,f,v,g)}set(e,t,n,s,r,o,a,l,c,u,p,d,h,f,v,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=p,m[14]=d,m[3]=h,m[7]=f,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ko().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/$i.setFromMatrixColumn(e,0).length(),r=1/$i.setFromMatrixColumn(e,1).length(),o=1/$i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){let d=o*u,h=o*p,f=a*u,v=a*p;t[0]=l*u,t[4]=-l*p,t[8]=c,t[1]=h+f*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=f+h*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,h=l*p,f=c*u,v=c*p;t[0]=d+v*a,t[4]=f*a-h,t[8]=o*c,t[1]=o*p,t[5]=o*u,t[9]=-a,t[2]=h*a-f,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,h=l*p,f=c*u,v=c*p;t[0]=d-v*a,t[4]=-o*p,t[8]=f+h*a,t[1]=h+f*a,t[5]=o*u,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,h=o*p,f=a*u,v=a*p;t[0]=l*u,t[4]=f*c-h,t[8]=d*c+v,t[1]=l*p,t[5]=v*c+d,t[9]=h*c-f,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,h=o*c,f=a*l,v=a*c;t[0]=l*u,t[4]=v-d*p,t[8]=f*p+h,t[1]=p,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*p+f,t[10]=d-v*p}else if(e.order==="XZY"){let d=o*l,h=o*c,f=a*l,v=a*c;t[0]=l*u,t[4]=-p,t[8]=c*u,t[1]=d*p+v,t[5]=o*u,t[9]=h*p-f,t[2]=f*p-h,t[6]=a*u,t[10]=v*p+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zd,e,Hd)}lookAt(e,t,n){let s=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),pi.crossVectors(n,pn),pi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),pi.crossVectors(n,pn)),pi.normalize(),Br.crossVectors(pn,pi),s[0]=pi.x,s[4]=Br.x,s[8]=pn.x,s[1]=pi.y,s[5]=Br.y,s[9]=pn.y,s[2]=pi.z,s[6]=Br.z,s[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],p=n[5],d=n[9],h=n[13],f=n[2],v=n[6],g=n[10],m=n[14],_=n[3],E=n[7],y=n[11],w=n[15],T=s[0],x=s[4],b=s[8],F=s[12],D=s[1],O=s[5],B=s[9],z=s[13],A=s[2],k=s[6],V=s[10],H=s[14],ee=s[3],Y=s[7],Q=s[11],ne=s[15];return r[0]=o*T+a*D+l*A+c*ee,r[4]=o*x+a*O+l*k+c*Y,r[8]=o*b+a*B+l*V+c*Q,r[12]=o*F+a*z+l*H+c*ne,r[1]=u*T+p*D+d*A+h*ee,r[5]=u*x+p*O+d*k+h*Y,r[9]=u*b+p*B+d*V+h*Q,r[13]=u*F+p*z+d*H+h*ne,r[2]=f*T+v*D+g*A+m*ee,r[6]=f*x+v*O+g*k+m*Y,r[10]=f*b+v*B+g*V+m*Q,r[14]=f*F+v*z+g*H+m*ne,r[3]=_*T+E*D+y*A+w*ee,r[7]=_*x+E*O+y*k+w*Y,r[11]=_*b+E*B+y*V+w*Q,r[15]=_*F+E*z+y*H+w*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],p=e[6],d=e[10],h=e[14],f=e[3],v=e[7],g=e[11],m=e[15],_=l*h-c*d,E=a*h-c*p,y=a*d-l*p,w=o*h-c*u,T=o*d-l*u,x=o*p-a*u;return t*(v*_-g*E+m*y)-n*(f*_-g*w+m*T)+s*(f*E-v*w+m*x)-r*(f*y-v*T+g*x)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-n*(r*u-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],p=e[9],d=e[10],h=e[11],f=e[12],v=e[13],g=e[14],m=e[15],_=t*a-n*o,E=t*l-s*o,y=t*c-r*o,w=n*l-s*a,T=n*c-r*a,x=s*c-r*l,b=u*v-p*f,F=u*g-d*f,D=u*m-h*f,O=p*g-d*v,B=p*m-h*v,z=d*m-h*g,A=_*z-E*B+y*O+w*D-T*F+x*b;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/A;return e[0]=(a*z-l*B+c*O)*k,e[1]=(s*B-n*z-r*O)*k,e[2]=(v*x-g*T+m*w)*k,e[3]=(d*T-p*x-h*w)*k,e[4]=(l*D-o*z-c*F)*k,e[5]=(t*z-s*D+r*F)*k,e[6]=(g*y-f*x-m*E)*k,e[7]=(u*x-d*y+h*E)*k,e[8]=(o*B-a*D+c*b)*k,e[9]=(n*D-t*B-r*b)*k,e[10]=(f*T-v*y+m*_)*k,e[11]=(p*y-u*T-h*_)*k,e[12]=(a*F-o*O-l*b)*k,e[13]=(t*O-n*F+s*b)*k,e[14]=(v*E-f*w-g*_)*k,e[15]=(u*w-p*E+d*_)*k,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,p=a+a,d=r*c,h=r*u,f=r*p,v=o*u,g=o*p,m=a*p,_=l*c,E=l*u,y=l*p,w=n.x,T=n.y,x=n.z;return s[0]=(1-(v+m))*w,s[1]=(h+y)*w,s[2]=(f-E)*w,s[3]=0,s[4]=(h-y)*T,s[5]=(1-(d+m))*T,s[6]=(g+_)*T,s[7]=0,s[8]=(f+E)*x,s[9]=(g-_)*x,s[10]=(1-(d+v))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=$i.set(s[0],s[1],s[2]).length(),a=$i.set(s[4],s[5],s[6]).length(),l=$i.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Rn.copy(this);let c=1/o,u=1/a,p=1/l;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=p,Rn.elements[9]*=p,Rn.elements[10]*=p,t.setFromRotationMatrix(Rn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=bn,l=!1){let c=this.elements,u=2*r/(t-e),p=2*r/(n-s),d=(t+e)/(t-e),h=(n+s)/(n-s),f,v;if(l)f=r/(o-r),v=o*r/(o-r);else if(a===bn)f=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===gs)f=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=p,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=bn,l=!1){let c=this.elements,u=2/(t-e),p=2/(n-s),d=-(t+e)/(t-e),h=-(n+s)/(n-s),f,v;if(l)f=1/(o-r),v=o/(o-r);else if(a===bn)f=-2/(o-r),v=-(o+r)/(o-r);else if(a===gs)f=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=p,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=f,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ko.prototype.isMatrix4=!0;var ke=Ko,$i=new P,Rn=new ke,zd=new P(0,0,0),Hd=new P(1,1,1),pi=new P,Br=new P,pn=new P,Zc=new ke,Jc=new vt,tn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],p=s[2],d=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jc.setFromEuler(this),this.setFromQuaternion(Jc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};tn.DEFAULT_ORDER="XYZ";var _s=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Vd=0,$c=new P,Ki=new vt,Jn=new ke,zr=new P,Bs=new P,Gd=new P,kd=new vt,Kc=new P(1,0,0),jc=new P(0,1,0),Qc=new P(0,0,1),eu={type:"added"},Wd={type:"removed"},ji={type:"childadded",child:null},cl={type:"childremoved",child:null},Ht=class i extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new tn,n=new vt,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ke},normalMatrix:{value:new ze}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(Kc,e)}rotateY(e){return this.rotateOnAxis(jc,e)}rotateZ(e){return this.rotateOnAxis(Qc,e)}translateOnAxis(e,t){return $c.copy(e).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kc,e)}translateY(e){return this.translateOnAxis(jc,e)}translateZ(e){return this.translateOnAxis(Qc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Bs,zr,this.up):Jn.lookAt(zr,Bs,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),Ki.setFromRotationMatrix(Jn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Oe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eu),ji.child=e,this.dispatchEvent(ji),ji.child=null):Oe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wd),cl.child=e,this.dispatchEvent(cl),cl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eu),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,e,Gd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,kd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let p=l[c];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),p=o(e.shapes),d=o(e.skeletons),h=o(e.animations),f=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),h.length>0&&(n.animations=h),f.length>0&&(n.nodes=f)}return n.object=s,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ht.DEFAULT_UP=new P(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dt=class extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xd={type:"move"},ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=u.position.distanceTo(p.position),h=.02,f=.005;c.inputState.pinching&&d>h+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xd)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},Hr={h:0,s:0,l:0};function ul(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=Fd(e,1),t=Xe(t,0,1),n=Xe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ul(o,r,e+1/3),this.g=ul(o,r,e),this.b=ul(o,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=Et){function n(r){r!==void 0&&parseFloat(r)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let n=uh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return $e.workingToColorSpace(en.copy(this),e),Math.round(Xe(en.r*255,0,255))*65536+Math.round(Xe(en.g*255,0,255))*256+Math.round(Xe(en.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(en.copy(this),t);let n=en.r,s=en.g,r=en.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let p=o-a;switch(c=u<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=Et){$e.workingToColorSpace(en.copy(this),e);let t=en.r,n=en.g,s=en.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(Hr);let n=sl(mi.h,Hr.h,t),s=sl(mi.s,Hr.s,t),r=sl(mi.l,Hr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new fe;fe.NAMES=uh;var nr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new fe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var _i=class extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Cn=new P,$n=new P,hl=new P,Kn=new P,Qi=new P,es=new P,tu=new P,dl=new P,fl=new P,pl=new P,ml=new lt,gl=new lt,xl=new lt,ei=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Cn.subVectors(e,t),s.cross(Cn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Cn.subVectors(s,t),$n.subVectors(n,t),hl.subVectors(e,t);let o=Cn.dot(Cn),a=Cn.dot($n),l=Cn.dot(hl),c=$n.dot($n),u=$n.dot(hl),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;let d=1/p,h=(c*l-a*u)*d,f=(o*u-a*l)*d;return r.set(1-h-f,f,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Kn.x),l.addScaledVector(o,Kn.y),l.addScaledVector(a,Kn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return ml.setScalar(0),gl.setScalar(0),xl.setScalar(0),ml.fromBufferAttribute(e,t),gl.fromBufferAttribute(e,n),xl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ml,r.x),o.addScaledVector(gl,r.y),o.addScaledVector(xl,r.z),o}static isFrontFacing(e,t,n,s){return Cn.subVectors(n,t),$n.subVectors(e,t),Cn.cross($n).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Cn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Qi.subVectors(s,n),es.subVectors(r,n),dl.subVectors(e,n);let l=Qi.dot(dl),c=es.dot(dl);if(l<=0&&c<=0)return t.copy(n);fl.subVectors(e,s);let u=Qi.dot(fl),p=es.dot(fl);if(u>=0&&p<=u)return t.copy(s);let d=l*p-u*c;if(d<=0&&l>=0&&u<=0&&l-u>0)return o=l/(l-u),t.copy(n).addScaledVector(Qi,o);pl.subVectors(e,r);let h=Qi.dot(pl),f=es.dot(pl);if(f>=0&&h<=f)return t.copy(r);let v=h*c-l*f;if(v<=0&&c>=0&&f<=0)return a=c/(c-f),t.copy(n).addScaledVector(es,a);let g=u*f-h*p;if(g<=0&&p-u>=0&&h-f>=0)return tu.subVectors(r,s),a=(p-u)/(p-u+(h-f)),t.copy(s).addScaledVector(tu,a);let m=1/(g+v+d);return o=v*m,a=d*m,t.copy(n).addScaledVector(Qi,o).addScaledVector(es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Pn):Pn.fromBufferAttribute(r,o),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vr.copy(n.boundingBox)),Vr.applyMatrix4(e.matrixWorld),this.union(Vr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zs),Gr.subVectors(this.max,zs),ts.subVectors(e.a,zs),ns.subVectors(e.b,zs),is.subVectors(e.c,zs),gi.subVectors(ns,ts),xi.subVectors(is,ns),Li.subVectors(ts,is);let t=[0,-gi.z,gi.y,0,-xi.z,xi.y,0,-Li.z,Li.y,gi.z,0,-gi.x,xi.z,0,-xi.x,Li.z,0,-Li.x,-gi.y,gi.x,0,-xi.y,xi.x,0,-Li.y,Li.x,0];return!vl(t,ts,ns,is,Gr)||(t=[1,0,0,0,1,0,0,0,1],!vl(t,ts,ns,is,Gr))?!1:(kr.crossVectors(gi,xi),t=[kr.x,kr.y,kr.z],vl(t,ts,ns,is,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},jn=[new P,new P,new P,new P,new P,new P,new P,new P],Pn=new P,Vr=new zn,ts=new P,ns=new P,is=new P,gi=new P,xi=new P,Li=new P,zs=new P,Gr=new P,kr=new P,Di=new P;function vl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Di.fromArray(i,r);let a=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),l=e.dot(Di),c=t.dot(Di),u=n.dot(Di);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var ti=qd();function qd(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Yd(i){Math.abs(i)>65504&&Ue("DataUtils.toHalfFloat(): Value out of range."),i=Xe(i,-65504,65504),ti.floatView[0]=i;let e=ti.uint32View[0],t=e>>23&511;return ti.baseTable[t]+((e&8388607)>>ti.shiftTable[t])}function Zd(i){let e=i>>10;return ti.uint32View[0]=ti.mantissaTable[ti.offsetTable[e]+(i&1023)]+ti.exponentTable[e],ti.floatView[0]}var yi=class{static toHalfFloat(e){return Yd(e)}static fromHalfFloat(e){return Zd(e)}},Pt=new P,Wr=new ue,Jd=0,Tt=class extends Bn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oc,this.updateRanges=[],this.gpuType=wn,this.version=0,this._normalizationScale=e!==void 0?Ha(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):lh(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ch(e,this.array)}};var ir=class extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var sr=class extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var be=class extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}},$d=new zn,Hs=new P,_l=new P,si=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):$d.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hs.subVectors(e,this.center);let t=Hs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Hs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hs.copy(e.center).add(_l)),this.expandByPoint(Hs.copy(e.center).sub(_l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Kd=0,yn=new ke,yl=new Ht,ss=new P,mn=new zn,Vs=new zn,zt=new P,je=class i extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dd(e)?sr:ir)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return yl.lookAt(e),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new be(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Vs.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(mn.min,Vs.min),mn.expandByPoint(zt),zt.addVectors(mn.max,Vs.max),mn.expandByPoint(zt)):(mn.expandByPoint(Vs.min),mn.expandByPoint(Vs.max))}mn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)zt.fromBufferAttribute(a,c),l&&(ss.fromBufferAttribute(e,c),zt.add(ss)),s=Math.max(s,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Tt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let F=0;F<n.count;F++)a[F]=new P,l[F]=new P;let u=new P,p=new P,d=new P,h=new ue,f=new ue,v=new ue,g=new P,m=new P;function _(F,D,O){c[F]=c[D]=c[O]=1,u.fromBufferAttribute(n,F),p.fromBufferAttribute(n,D),d.fromBufferAttribute(n,O),h.fromBufferAttribute(r,F),f.fromBufferAttribute(r,D),v.fromBufferAttribute(r,O),p.sub(u),d.sub(u),f.sub(h),v.sub(h);let B=1/(f.x*v.y-v.x*f.y);isFinite(B)&&(g.copy(p).multiplyScalar(v.y).addScaledVector(d,-f.y).multiplyScalar(B),m.copy(d).multiplyScalar(f.x).addScaledVector(p,-v.x).multiplyScalar(B),a[F].add(g),a[D].add(g),a[O].add(g),l[F].add(m),l[D].add(m),l[O].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let F=0,D=E.length;F<D;++F){let O=E[F],B=O.start,z=O.count;for(let A=B,k=B+z;A<k;A+=3)_(e.getX(A+0),e.getX(A+1),e.getX(A+2))}let y=new P,w=new P,T=new P,x=new P;function b(F){T.fromBufferAttribute(s,F),x.copy(T);let D=a[F];y.copy(D),y.sub(T.multiplyScalar(T.dot(D))).normalize(),w.crossVectors(x,D);let B=w.dot(l[F])<0?-1:1;o.setXYZW(F,y.x,y.y,y.z,B)}for(let F=0,D=n.count;F<D;++F)c[F]&&b(F);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,h=n.count;d<h;d++)n.setXYZ(d,0,0,0);let s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,u=new P,p=new P;if(e)for(let d=0,h=e.count;d<h;d+=3){let f=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);s.fromBufferAttribute(t,f),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,h=t.count;d<h;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,p=a.normalized,d=new c.constructor(l.length*u),h=0,f=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?h=l[v]*a.data.stride+a.offset:h=l[v]*u;for(let m=0;m<u;m++)d[f++]=c[h++]}return new Tt(d,u,p)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,p=c.length;u<p;u++){let d=c[u],h=e(d,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let p=0,d=c.length;p<d;p++){let h=c[p];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],p=r[c];for(let d=0,h=p.length;d<h;d++)u.push(p[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},wo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oc,this.updateRanges=[],this.version=0,this.uuid=Wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=nu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=nu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function nu(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Wi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var un=new P,rr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?Ha(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){er("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){er("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):lh(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ch(e,this.data.array)}},Ml=new P,jd=new P,Qd=new ze,hn=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ml.subVectors(n,t).cross(jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Ml),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Qd.getNormalMatrix(e),s=this.coplanarPoint(Ml).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ef=0,Hn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=As,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vl,this.blendDst=Gl,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ku,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ho,this.stencilZFail=ho,this.stencilZPass=ho,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new hn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ue().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Mi=class extends Hn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rs,Gs=new P,os=new P,as=new P,ls=new ue,ks=new ue,hh=new ke,Xr=new P,Ws=new P,qr=new P,iu=new ue,bl=new ue,su=new ue,Ui=class extends Ht{constructor(e=new Mi){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new je;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new wo(t,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new rr(n,3,0,!1)),rs.setAttribute("uv",new rr(n,2,3,!1))}this.geometry=rs,this.material=e,this.center=new ue(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Oe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),hh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Yr(Xr.set(-.5,-.5,0),as,o,os,s,r),Yr(Ws.set(.5,-.5,0),as,o,os,s,r),Yr(qr.set(.5,.5,0),as,o,os,s,r),iu.set(0,0),bl.set(1,0),su.set(1,1);let a=e.ray.intersectTriangle(Xr,Ws,qr,!1,Gs);if(a===null&&(Yr(Ws.set(-.5,.5,0),as,o,os,s,r),bl.set(0,1),a=e.ray.intersectTriangle(Xr,qr,Ws,!1,Gs),a===null))return;let l=e.ray.origin.distanceTo(Gs);l<e.near||l>e.far||t.push({distance:l,point:Gs.clone(),uv:ei.getInterpolation(Gs,Xr,Ws,qr,iu,bl,su,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Yr(i,e,t,n,s,r){ls.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(ks.x=r*ls.x-s*ls.y,ks.y=s*ls.x+r*ls.y):ks.copy(ls),i.copy(e),i.x+=ks.x,i.y+=ks.y,i.applyMatrix4(hh)}var Qn=new P,Sl=new P,Zr=new P,Jr=new P,Ms=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Sl.copy(e).add(t).multiplyScalar(.5),Zr.copy(t).sub(e).normalize(),Jr.copy(this.origin).sub(Sl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Zr),a=Jr.dot(this.direction),l=-Jr.dot(Zr),c=Jr.lengthSq(),u=Math.abs(1-o*o),p,d,h,f;if(u>0)if(p=o*l-a,d=o*a-l,f=r*u,p>=0)if(d>=-f)if(d<=f){let v=1/u;p*=v,d*=v,h=p*(p+o*d+2*a)+d*(o*p+d+2*l)+c}else d=r,p=Math.max(0,-(o*d+a)),h=-p*p+d*(d+2*l)+c;else d=-r,p=Math.max(0,-(o*d+a)),h=-p*p+d*(d+2*l)+c;else d<=-f?(p=Math.max(0,-(-o*r+a)),d=p>0?-r:Math.min(Math.max(-r,-l),r),h=-p*p+d*(d+2*l)+c):d<=f?(p=0,d=Math.min(Math.max(-r,-l),r),h=d*(d+2*l)+c):(p=Math.max(0,-(o*r+a)),d=p>0?r:Math.min(Math.max(-r,-l),r),h=-p*p+d*(d+2*l)+c);else d=o>0?-r:r,p=Math.max(0,-(o*d+a)),h=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Sl).addScaledVector(Zr,d),h}intersectSphere(e,t){if(e.radius<0)return null;Qn.subVectors(e.center,this.origin);let n=Qn.dot(this.direction),s=Qn.dot(Qn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(e.min.z-d.z)*p,l=(e.max.z-d.z)*p):(a=(e.max.z-d.z)*p,l=(e.min.z-d.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,p=e.x-o.x,d=e.y-o.y,h=e.z-o.z,f=t.x-o.x,v=t.y-o.y,g=t.z-o.z,m=n.x-o.x,_=n.y-o.y,E=n.z-o.z,y=Math.abs(l),w=Math.abs(c),T=Math.abs(u),x,b,F,D,O,B,z,A,k,V,H,ee;if(y>=w&&y>=T?(F=l,B=p,k=f,ee=m,l>=0?(x=c,b=u,D=d,O=h,z=v,A=g,V=_,H=E):(x=u,b=c,D=h,O=d,z=g,A=v,V=E,H=_)):w>=T?(F=c,B=d,k=v,ee=_,c>=0?(x=u,b=l,D=h,O=p,z=g,A=f,V=E,H=m):(x=l,b=u,D=p,O=h,z=f,A=g,V=m,H=E)):(F=u,B=h,k=g,ee=E,u>=0?(x=l,b=c,D=p,O=d,z=f,A=v,V=m,H=_):(x=c,b=l,D=d,O=p,z=v,A=f,V=_,H=m)),F===0)return null;let Y=x/F,Q=b/F,ne=1/F,_e=D-Y*B,we=O-Q*B,ie=z-Y*k,pe=A-Q*k,Me=V-Y*ee,Pe=H-Q*ee,he=Me*pe-Pe*ie,Fe=_e*Pe-we*Me,yt=ie*we-pe*_e;if(s){if(he<0||Fe<0||yt<0)return null}else if((he<0||Fe<0||yt<0)&&(he>0||Fe>0||yt>0))return null;let Ae=he+Fe+yt;if(Ae===0)return null;let qe=ne*(he*B+Fe*k+yt*ee);return(Ae>0?qe<0:qe>0)?null:this.at(qe/Ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Vn=class extends Hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ru=new ke,Ni=new Ms,$r=new si,ou=new P,Kr=new P,jr=new P,Qr=new P,El=new P,eo=new P,au=new P,to=new P,We=class extends Ht{constructor(e=new je,t=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){eo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],p=r[l];u!==0&&(El.fromBufferAttribute(p,e),o?eo.addScaledVector(El,u):eo.addScaledVector(El.sub(t),u))}t.add(eo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),Ni.copy(e.ray).recast(e.near),!($r.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere($r,ou)===null||Ni.origin.distanceToSquared(ou)>(e.far-e.near)**2))&&(ru.copy(r).invert(),Ni.copy(e.ray).applyMatrix4(ru),!(n.boundingBox!==null&&Ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ni)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,d=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let f=0,v=d.length;f<v;f++){let g=d[f],m=o[g.materialIndex],_=Math.max(g.start,h.start),E=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let y=_,w=E;y<w;y+=3){let T=a.getX(y),x=a.getX(y+1),b=a.getX(y+2);s=no(this,m,e,n,c,u,p,T,x,b),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let f=Math.max(0,h.start),v=Math.min(a.count,h.start+h.count);for(let g=f,m=v;g<m;g+=3){let _=a.getX(g),E=a.getX(g+1),y=a.getX(g+2);s=no(this,o,e,n,c,u,p,_,E,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let f=0,v=d.length;f<v;f++){let g=d[f],m=o[g.materialIndex],_=Math.max(g.start,h.start),E=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let y=_,w=E;y<w;y+=3){let T=y,x=y+1,b=y+2;s=no(this,m,e,n,c,u,p,T,x,b),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let f=Math.max(0,h.start),v=Math.min(l.count,h.start+h.count);for(let g=f,m=v;g<m;g+=3){let _=g,E=g+1,y=g+2;s=no(this,o,e,n,c,u,p,_,E,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function tf(i,e,t,n,s,r,o,a){let l;if(e.side===Lt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Gn,a),l===null)return null;to.copy(a),to.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(to);return c<t.near||c>t.far?null:{distance:c,point:to.clone(),object:i}}function no(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Kr),i.getVertexPosition(l,jr),i.getVertexPosition(c,Qr);let u=tf(i,e,t,n,Kr,jr,Qr,au);if(u){let p=new P;ei.getBarycoord(au,Kr,jr,Qr,p),s&&(u.uv=ei.getInterpolatedAttribute(s,a,l,c,p,new ue)),r&&(u.uv1=ei.getInterpolatedAttribute(r,a,l,c,p,new ue)),o&&(u.normal=ei.getInterpolatedAttribute(o,a,l,c,p,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};ei.getNormal(Kr,jr,Qr,d.normal),u.face=d,u.barycoord=p}return u}var Oi=class extends Yt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=At,u=At,p,d){super(null,o,a,l,c,u,s,r,p,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var In=class extends Tt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},cs=new ke,lu=new ke,io=[],cu=new zn,nf=new ke,Xs=new We,qs=new si,Sn=class extends We{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new In(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,nf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cs),cu.copy(e.boundingBox).applyMatrix4(cs),this.boundingBox.union(cu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new si),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cs),qs.copy(e.boundingSphere).applyMatrix4(cs),this.boundingSphere.union(qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Xs.geometry=this.geometry,Xs.material=this.material,Xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qs.copy(this.boundingSphere),qs.applyMatrix4(n),e.ray.intersectsSphere(qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,cs),lu.multiplyMatrices(n,cs),Xs.matrixWorld=lu,Xs.raycast(e,io);for(let o=0,a=io.length;o<a;o++){let l=io[o];l.instanceId=r,l.object=this,t.push(l)}io.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new In(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oi(new Float32Array(s*this.count),s,this.count,sa,wn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Fi=new si,sf=new ue(.5,.5),so=new P,bi=class{constructor(e=new hn,t=new hn,n=new hn,s=new hn,r=new hn,o=new hn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],p=r[5],d=r[6],h=r[7],f=r[8],v=r[9],g=r[10],m=r[11],_=r[12],E=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-o,h-u,m-f,w-_).normalize(),s[1].setComponents(c+o,h+u,m+f,w+_).normalize(),s[2].setComponents(c+a,h+p,m+v,w+E).normalize(),s[3].setComponents(c-a,h-p,m-v,w-E).normalize(),n)s[4].setComponents(l,d,g,y).normalize(),s[5].setComponents(c-l,h-d,m-g,w-y).normalize();else if(s[4].setComponents(c-l,h-d,m-g,w-y).normalize(),t===bn)s[5].setComponents(c+l,h+d,m+g,w+y).normalize();else if(t===gs)s[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){Fi.center.set(0,0,0);let t=sf.distanceTo(e.center);return Fi.radius=.7071067811865476+t,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(so.x=s.normal.x>0?e.max.x:e.min.x,so.y=s.normal.y>0?e.max.y:e.min.y,so.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(so)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},uu=new ke,Ao=class i{constructor(){this.coordinateSystem=bn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];uu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new bi),n[s].setFromProjectionMatrix(uu,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new bi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Ro=class extends Hn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},hu=new ke,Dl=new Ms,ro=new si,oo=new P,Si=class extends Ht{constructor(e=new je,t=new Ro){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(s),ro.radius+=r,e.ray.intersectsSphere(ro)===!1)return;hu.copy(s).invert(),Dl.copy(e.ray).applyMatrix4(hu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let f=d,v=h;f<v;f++){let g=c.getX(f);oo.fromBufferAttribute(p,g),du(oo,g,l,s,e,t,this)}}else{let d=Math.max(0,o.start),h=Math.min(p.count,o.start+o.count);for(let f=d,v=h;f<v;f++)oo.fromBufferAttribute(p,f),du(oo,f,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function du(i,e,t,n,s,r,o){let a=Dl.distanceSqToPoint(i);if(a<t){let l=new P;Dl.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var or=class extends Yt{constructor(e=[],t=Gi,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},gn=class extends Yt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ln=class extends Yt{constructor(e,t,n=Nn,s,r,o,a=At,l=At,c,u=ii,p=1){if(u!==ii&&u!==ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:p};super(d,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ar=class extends Ln{constructor(e,t=Nn,n=Gi,s,r,o=At,a=At,l,c=ii){let u={width:e,height:e,depth:1},p=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,a,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},lr=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Dn=class i extends je{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],p=[],d=0,h=0;f("z","y","x",-1,-1,n,t,e,o,r,0),f("z","y","x",1,-1,n,t,-e,o,r,1),f("x","z","y",1,1,e,n,t,s,o,2),f("x","z","y",1,-1,e,n,-t,s,o,3),f("x","y","z",1,-1,e,t,n,s,r,4),f("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new be(c,3)),this.setAttribute("normal",new be(u,3)),this.setAttribute("uv",new be(p,2));function f(v,g,m,_,E,y,w,T,x,b,F){let D=y/x,O=w/b,B=y/2,z=w/2,A=T/2,k=x+1,V=b+1,H=0,ee=0,Y=new P;for(let Q=0;Q<V;Q++){let ne=Q*O-z;for(let _e=0;_e<k;_e++){let we=_e*D-B;Y[v]=we*_,Y[g]=ne*E,Y[m]=A,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[g]=0,Y[m]=T>0?1:-1,u.push(Y.x,Y.y,Y.z),p.push(_e/x),p.push(1-Q/b),H+=1}}for(let Q=0;Q<b;Q++)for(let ne=0;ne<x;ne++){let _e=d+ne+k*Q,we=d+ne+k*(Q+1),ie=d+(ne+1)+k*(Q+1),pe=d+(ne+1)+k*Q;l.push(_e,we,pe),l.push(we,ie,pe),ee+=6}a.addGroup(h,ee,F),h+=ee,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var bs=class i extends je{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],p=[],d=[],h=[],f=0,v=[],g=n/2,m=0;_(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new be(p,3)),this.setAttribute("normal",new be(d,3)),this.setAttribute("uv",new be(h,2));function _(){let y=new P,w=new P,T=0,x=(t-e)/n;for(let b=0;b<=r;b++){let F=[],D=b/r,O=D*(t-e)+e;for(let B=0;B<=s;B++){let z=B/s,A=z*l+a,k=Math.sin(A),V=Math.cos(A);w.x=O*k,w.y=-D*n+g,w.z=O*V,p.push(w.x,w.y,w.z),y.set(k,x,V).normalize(),d.push(y.x,y.y,y.z),h.push(z,1-D),F.push(f++)}v.push(F)}for(let b=0;b<s;b++)for(let F=0;F<r;F++){let D=v[F][b],O=v[F+1][b],B=v[F+1][b+1],z=v[F][b+1];(e>0||F!==0)&&(u.push(D,O,z),T+=3),(t>0||F!==r-1)&&(u.push(O,B,z),T+=3)}c.addGroup(m,T,0),m+=T}function E(y){let w=f,T=new ue,x=new P,b=0,F=y===!0?e:t,D=y===!0?1:-1;for(let B=1;B<=s;B++)p.push(0,g*D,0),d.push(0,D,0),h.push(.5,.5),f++;let O=f;for(let B=0;B<=s;B++){let A=B/s*l+a,k=Math.cos(A),V=Math.sin(A);x.x=F*V,x.y=g*D,x.z=F*k,p.push(x.x,x.y,x.z),d.push(0,D,0),T.x=k*.5+.5,T.y=V*.5*D+.5,h.push(T.x,T.y),f++}for(let B=0;B<s;B++){let z=w+B,A=O+B;y===!0?u.push(A,A+1,z):u.push(A+1,A,z),b+=3}c.addGroup(m,b,y===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ss=class i extends bs{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Co=class i extends je{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new be(r,3)),this.setAttribute("normal",new be(r.slice(),3)),this.setAttribute("uv",new be(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let E=new P,y=new P,w=new P;for(let T=0;T<t.length;T+=3)h(t[T+0],E),h(t[T+1],y),h(t[T+2],w),l(E,y,w,_)}function l(_,E,y,w){let T=w+1,x=[];for(let b=0;b<=T;b++){x[b]=[];let F=_.clone().lerp(y,b/T),D=E.clone().lerp(y,b/T),O=T-b;for(let B=0;B<=O;B++)B===0&&b===T?x[b][B]=F:x[b][B]=F.clone().lerp(D,B/O)}for(let b=0;b<T;b++)for(let F=0;F<2*(T-b)-1;F++){let D=Math.floor(F/2);F%2===0?(d(x[b][D+1]),d(x[b+1][D]),d(x[b][D])):(d(x[b][D+1]),d(x[b+1][D+1]),d(x[b+1][D]))}}function c(_){let E=new P;for(let y=0;y<r.length;y+=3)E.x=r[y+0],E.y=r[y+1],E.z=r[y+2],E.normalize().multiplyScalar(_),r[y+0]=E.x,r[y+1]=E.y,r[y+2]=E.z}function u(){let _=new P;for(let E=0;E<r.length;E+=3){_.x=r[E+0],_.y=r[E+1],_.z=r[E+2];let y=g(_)/2/Math.PI+.5,w=m(_)/Math.PI+.5;o.push(y,1-w)}f(),p()}function p(){for(let _=0;_<o.length;_+=6){let E=o[_+0],y=o[_+2],w=o[_+4],T=Math.max(E,y,w),x=Math.min(E,y,w);T>.9&&x<.1&&(E<.2&&(o[_+0]+=1),y<.2&&(o[_+2]+=1),w<.2&&(o[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function h(_,E){let y=_*3;E.x=e[y+0],E.y=e[y+1],E.z=e[y+2]}function f(){let _=new P,E=new P,y=new P,w=new P,T=new ue,x=new ue,b=new ue;for(let F=0,D=0;F<r.length;F+=9,D+=6){_.set(r[F+0],r[F+1],r[F+2]),E.set(r[F+3],r[F+4],r[F+5]),y.set(r[F+6],r[F+7],r[F+8]),T.set(o[D+0],o[D+1]),x.set(o[D+2],o[D+3]),b.set(o[D+4],o[D+5]),w.copy(_).add(E).add(y).divideScalar(3);let O=g(w);v(T,D+0,_,O),v(x,D+2,E,O),v(b,D+4,y,O)}}function v(_,E,y,w){w<0&&_.x===1&&(o[E]=_.x-1),y.x===0&&y.z===0&&(o[E]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ue("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let u=n[s],d=n[s+1]-u,h=(o-u)/d;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ue:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,s=[],r=[],o=[],a=new P,l=new ke;for(let h=0;h<=e;h++){let f=h/e;s[h]=this.getTangentAt(f,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),p=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(s[h-1],s[h]),a.length()>Number.EPSILON){a.normalize();let f=Math.acos(Xe(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(l.makeRotationAxis(a,f))}o[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(Xe(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(h=-h);for(let f=1;f<=e;f++)r[f].applyMatrix4(l.makeRotationAxis(s[f],h*f)),o[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},cr=class extends En{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ue){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=l-this.aX,h=c-this.aY;l=d*u-h*p+this.aX,c=d*p+h*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Po=class extends cr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function lc(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,p){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,h=(a-o)/u-(l-o)/(u+p)+(l-a)/p;d*=u,h*=u,s(o,a,d,h)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var fu=new P,pu=new P,Tl=new lc,wl=new lc,Al=new lc,Ei=class extends En{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(pu.subVectors(s[0],s[1]).add(s[0]),c=pu);let p=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(fu.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=fu),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,f=Math.pow(c.distanceToSquared(p),h),v=Math.pow(p.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(u),h);v<1e-4&&(v=1),f<1e-4&&(f=v),g<1e-4&&(g=v),Tl.initNonuniformCatmullRom(c.x,p.x,d.x,u.x,f,v,g),wl.initNonuniformCatmullRom(c.y,p.y,d.y,u.y,f,v,g),Al.initNonuniformCatmullRom(c.z,p.z,d.z,u.z,f,v,g)}else this.curveType==="catmullrom"&&(Tl.initCatmullRom(c.x,p.x,d.x,u.x,this.tension),wl.initCatmullRom(c.y,p.y,d.y,u.y,this.tension),Al.initCatmullRom(c.z,p.z,d.z,u.z,this.tension));return n.set(Tl.calc(l),wl.calc(l),Al.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function mu(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function rf(i,e){let t=1-i;return t*t*e}function of(i,e){return 2*(1-i)*i*e}function af(i,e){return i*i*e}function Zs(i,e,t,n){return rf(i,e)+of(i,t)+af(i,n)}function lf(i,e){let t=1-i;return t*t*t*e}function cf(i,e){let t=1-i;return 3*t*t*i*e}function uf(i,e){return 3*(1-i)*i*i*e}function hf(i,e){return i*i*i*e}function Js(i,e,t,n,s){return lf(i,e)+cf(i,t)+uf(i,n)+hf(i,s)}var Io=class extends En{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Js(e,s.x,r.x,o.x,a.x),Js(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Lo=class extends En{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Js(e,s.x,r.x,o.x,a.x),Js(e,s.y,r.y,o.y,a.y),Js(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Do=class extends En{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},No=class extends En{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fo=class extends En{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Zs(e,s.x,r.x,o.x),Zs(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ur=class extends En{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Zs(e,s.x,r.x,o.x),Zs(e,s.y,r.y,o.y),Zs(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Uo=class extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return n.set(mu(a,l.x,c.x,u.x,p.x),mu(a,l.y,c.y,u.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ue().fromArray(s))}return this}},df=Object.freeze({__proto__:null,ArcCurve:Po,CatmullRomCurve3:Ei,CubicBezierCurve:Io,CubicBezierCurve3:Lo,EllipseCurve:cr,LineCurve:Do,LineCurve3:No,QuadraticBezierCurve:Fo,QuadraticBezierCurve3:ur,SplineCurve:Uo});var hr=class i extends Co{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Tn=class i extends je{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,p=e/a,d=t/l,h=[],f=[],v=[],g=[];for(let m=0;m<u;m++){let _=m*d-o;for(let E=0;E<c;E++){let y=E*p-r;f.push(y,-_,0),v.push(0,0,1),g.push(E/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<a;_++){let E=_+c*m,y=_+c*(m+1),w=_+1+c*(m+1),T=_+1+c*m;h.push(E,y,T),h.push(y,w,T)}this.setIndex(h),this.setAttribute("position",new be(f,3)),this.setAttribute("normal",new be(v,3)),this.setAttribute("uv",new be(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ri=class i extends je{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],p=new P,d=new P,h=[],f=[],v=[],g=[];for(let m=0;m<=n;m++){let _=[],E=m/n,y=o+E*a,w=e*Math.cos(y),T=Math.sqrt(e*e-w*w),x=0;m===0&&o===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let b=0;b<=t;b++){let F=b/t,D=s+F*r;p.x=-T*Math.cos(D),p.y=w,p.z=T*Math.sin(D),f.push(p.x,p.y,p.z),d.copy(p).normalize(),v.push(d.x,d.y,d.z),g.push(F+x,1-E),_.push(c++)}u.push(_)}for(let m=0;m<n;m++)for(let _=0;_<t;_++){let E=u[m][_+1],y=u[m][_],w=u[m+1][_],T=u[m+1][_+1];(m!==0||o>0)&&h.push(E,y,T),(m!==n-1||l<Math.PI)&&h.push(y,w,T)}this.setIndex(h),this.setAttribute("position",new be(f,3)),this.setAttribute("normal",new be(v,3)),this.setAttribute("uv",new be(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Bi=class i extends je{constructor(e=new ur(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new P,l=new P,c=new ue,u=new P,p=[],d=[],h=[],f=[];v(),this.setIndex(f),this.setAttribute("position",new be(p,3)),this.setAttribute("normal",new be(d,3)),this.setAttribute("uv",new be(h,2));function v(){for(let E=0;E<t;E++)g(E);g(r===!1?t:0),_(),m()}function g(E){u=e.getPointAt(E/t,u);let y=o.normals[E],w=o.binormals[E];for(let T=0;T<=s;T++){let x=T/s*Math.PI*2,b=Math.sin(x),F=-Math.cos(x);l.x=F*y.x+b*w.x,l.y=F*y.y+b*w.y,l.z=F*y.z+b*w.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,p.push(a.x,a.y,a.z)}}function m(){for(let E=1;E<=t;E++)for(let y=1;y<=s;y++){let w=(s+1)*(E-1)+(y-1),T=(s+1)*E+(y-1),x=(s+1)*E+y,b=(s+1)*(E-1)+y;f.push(w,T,b),f.push(T,x,b)}}function _(){for(let E=0;E<=t;E++)for(let y=0;y<=s;y++)c.x=E/t,c.y=y/s,h.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new df[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Xi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(gu(s))s.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(gu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function nn(i){let e={};for(let t=0;t<i.length;t++){let n=Xi(i[t]);for(let s in n)e[s]=n[s]}return e}function gu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function ff(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function cc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}var Va={clone:Xi,merge:nn},pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mt=class extends Hn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xi(e.uniforms),this.uniformsGroups=ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new fe().setHex(s.value);break;case"v2":this.uniforms[n].value=new ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ze().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ke().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Oo=class extends mt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vt=class extends Hn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var zi=class extends Hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bo=class extends Hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function us(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ao(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ti=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},zo=class extends Ti{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pl,endingEnd:Pl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Il:r=e,a=2*t-n;break;case Ll:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Il:o=e,l=2*n-t;break;case Ll:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,p=this._offsetNext,d=this._weightPrev,h=this._weightNext,f=(n-t)/(s-t),v=f*f,g=v*f,m=-d*g+2*d*v-d*f,_=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*f+1,E=(-1-h)*g+(1.5+h)*v+.5*f,y=h*g-h*v;for(let w=0;w!==a;++w)r[w]=m*o[u+w]+_*o[c+w]+E*o[l+w]+y*o[p+w];return r}},Ho=class extends Ti{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),p=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*p+o[l+d]*u;return r}},Vo=class extends Ti{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Go=class extends Ti{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.inTangents,p=this.outTangents;if(!u||!p){let f=(n-t)/(s-t),v=1-f;for(let g=0;g!==a;++g)r[g]=o[c+g]*v+o[l+g]*f;return r}let d=a*2,h=e-1;for(let f=0;f!==a;++f){let v=o[c+f],g=o[l+f],m=h*d+f*2,_=p[m],E=p[m+1],y=e*d+f*2,w=u[y],T=u[y+1],x=xf(n,t,_,w,s);r[f]=dh(x,v,E,T,g)}return r}};function dh(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function gf(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function xf(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=dh(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=gf(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var xn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=us(t,this.TimeBufferType),this.values=us(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:us(e.times,Array),values:us(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),ao(e.settings)&&(n.settings={inTangents:us(e.settings.inTangents,Array),outTangents:us(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Go(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case $s:t=this.InterpolantFactoryMethodDiscrete;break;case Mo:t=this.InterpolantFactoryMethodLinear;break;case uo:t=this.InterpolantFactoryMethodSmooth;break;case Cl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ue("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $s;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return uo;case this.InterpolantFactoryMethodBezier:return Cl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;ao(this.settings)&&(xu(this.settings.inTangents,e),xu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;ao(this.settings)&&(vu(this.settings.inTangents,e),vu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Oe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Oe("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Oe("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Oe("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&Nd(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Oe("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===uo,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let p=a*n,d=p-n,h=p+n;for(let f=0;f!==n;++f){let v=t[p+f];if(v!==t[d+f]||v!==t[h+f]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let p=a*n,d=o*n;for(let h=0;h!==n;++h)t[d+h]=t[p+h]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,ao(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function xu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function vu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Mo;var wi=class extends xn{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=$s;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}};ko.prototype.ValueTypeName="color";var Wo=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}};Wo.prototype.ValueTypeName="number";var Xo=class extends Ti{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)vt.slerpFlat(r,0,o,c-a,o,c,l);return r}},dr=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Xo(this.times,this.values,this.getValueSize(),e)}};dr.prototype.ValueTypeName="quaternion";dr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends xn{constructor(e,t,n){super(e,t,n)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=$s;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var qo=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}};qo.prototype.ValueTypeName="vector";var Yo=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,p){return c.push(u,p),this},this.removeHandler=function(u){let p=c.indexOf(u);return p!==-1&&c.splice(p,2),this},this.getHandler=function(u){for(let p=0,d=c.length;p<d;p+=2){let h=c[p],f=c[p+1];if(h.global&&(h.lastIndex=0),h.test(u))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},fh=new Yo,Zo=class{constructor(e){this.manager=e!==void 0?e:fh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Zo.DEFAULT_MATERIAL_NAME="__DEFAULT";var fr=class extends Ht{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},pr=class extends fr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Rl=new ke,_u=new P,yu=new P,Jo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bi,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;_u.setFromMatrixPosition(e.matrixWorld),t.position.copy(_u),yu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Rl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Rl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===gs||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Rl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},lo=new P,co=new vt,On=new P,mr=class extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(lo,co,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,On.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(lo,co,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,co,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},vi=new P,Mu=new ue,bu=new ue,qt=class extends mr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=bo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(il*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bo*2*Math.atan(Math.tan(il*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Mu,bu),t.subVectors(bu,Mu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(il*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var oi=class extends mr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Nl=class extends Jo{constructor(){super(new oi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Es=class extends fr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new Nl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ai=class extends je{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var hs=-90,ds=1,Ts=class extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(hs,ds,e,t);s.layers=this.layers,this.add(s);let r=new qt(hs,ds,e,t);r.layers=this.layers,this.add(r);let o=new qt(hs,ds,e,t);o.layers=this.layers,this.add(o);let a=new qt(hs,ds,e,t);a.layers=this.layers,this.add(a);let l=new qt(hs,ds,e,t);l.layers=this.layers,this.add(l);let c=new qt(hs,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,p=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=v,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(p,d,h),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},$o=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var uc="\\[\\]\\.:\\/",vf=new RegExp("["+uc+"]","g"),hc="[^"+uc+"]",_f="[^"+uc.replace("\\.","")+"]",yf=/((?:WC+[\/:])*)/.source.replace("WC",hc),Mf=/(WCOD+)?/.source.replace("WCOD",_f),bf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hc),Sf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hc),Ef=new RegExp("^"+yf+Mf+bf+Sf+"$"),Tf=["material","materials","bones","map"],Fl=class{constructor(e,t,n){let s=n||xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},xt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vf,"")}static parseTrackName(e){let t=Ef.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Tf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ue("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Oe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Oe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Oe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Oe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Oe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Oe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Oe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Oe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xt.Composite=Fl;xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xt.prototype.GetterByBindingType=[xt.prototype._getValue_direct,xt.prototype._getValue_array,xt.prototype._getValue_arrayElement,xt.prototype._getValue_toArray];xt.prototype.SetterByBindingTypeAndVersioning=[[xt.prototype._setValue_direct,xt.prototype._setValue_direct_setNeedsUpdate,xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_array,xt.prototype._setValue_array_setNeedsUpdate,xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_arrayElement,xt.prototype._setValue_arrayElement_setNeedsUpdate,xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xt.prototype._setValue_fromArray,xt.prototype._setValue_fromArray_setNeedsUpdate,xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jx=new Float32Array(1);var Su=new ke,gr=class{constructor(e,t,n=0,s=1/0){this.ray=new Ms(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new _s,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Oe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Su.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Su),this}intersectObject(e,t=!0,n=[]){return Ul(e,this,n,t),n.sort(Eu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ul(e[s],this,n,t);return n.sort(Eu),n}};function Eu(i,e){return i.distance-e.distance}function Ul(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Ul(r[o],e,t,!0)}}var xc=class xc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};xc.prototype.isMatrix2=!0;var Ol=xc;function dc(i,e,t,n){let s=wf(n);switch(t){case tc:return i*e;case sa:return i*e/s.components*s.byteLength;case ra:return i*e/s.components*s.byteLength;case Ri:return i*e*2/s.components*s.byteLength;case oa:return i*e*2/s.components*s.byteLength;case nc:return i*e*3/s.components*s.byteLength;case vn:return i*e*4/s.components*s.byteLength;case aa:return i*e*4/s.components*s.byteLength;case yr:case Mr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case br:case Sr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ca:case ha:return Math.max(i,16)*Math.max(e,8)/4;case la:case ua:return Math.max(i,8)*Math.max(e,8)/2;case da:case fa:case ma:case ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pa:case Er:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _a:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ya:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Sa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case wa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case La:case Da:case Na:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fa:case Ua:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Tr:case Oa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wf(i){switch(i){case dn:case Kl:return{byteLength:1,components:1};case Cs:case jl:case Jt:return{byteLength:2,components:1};case na:case ia:return{byteLength:2,components:4};case Nn:case ta:case wn:return{byteLength:4,components:1};case Ql:case ec:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Fh(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Rf(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,p=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){let u=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,u);else{p.sort((h,f)=>h.start-f.start);let d=0;for(let h=1;h<p.length;h++){let f=p[d],v=p[h];v.start<=f.start+f.count+1?f.count=Math.max(f.count,v.start+v.count-f.start):(++d,p[d]=v)}p.length=d+1;for(let h=0,f=p.length;h<f;h++){let v=p[h];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Cf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,If=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Df=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ff=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Of=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Bf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,kf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$f=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ep=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ip=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",rp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,yp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Mp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ep=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ap=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ip=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Up=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gp=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,em=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,im=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,um=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_m=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ym=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Am=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Im=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Fm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Um=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Om=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,km=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ym=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$m=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Km=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Cf,alphahash_pars_fragment:Pf,alphamap_fragment:If,alphamap_pars_fragment:Lf,alphatest_fragment:Df,alphatest_pars_fragment:Nf,aomap_fragment:Ff,aomap_pars_fragment:Uf,batching_pars_vertex:Of,batching_vertex:Bf,begin_vertex:zf,beginnormal_vertex:Hf,bsdfs:Vf,iridescence_fragment:Gf,bumpmap_pars_fragment:kf,clipping_planes_fragment:Wf,clipping_planes_pars_fragment:Xf,clipping_planes_pars_vertex:qf,clipping_planes_vertex:Yf,color_fragment:Zf,color_pars_fragment:Jf,color_pars_vertex:$f,color_vertex:Kf,common:jf,defaultnormal_vertex:Qf,displacementmap_pars_vertex:ep,displacementmap_vertex:tp,emissivemap_fragment:np,emissivemap_pars_fragment:ip,colorspace_fragment:sp,colorspace_pars_fragment:rp,envmap_fragment:op,envmap_common_pars_fragment:ap,envmap_pars_fragment:lp,envmap_pars_vertex:cp,envmap_physical_pars_fragment:yp,envmap_vertex:up,fog_vertex:hp,fog_pars_vertex:dp,fog_fragment:fp,fog_pars_fragment:pp,gradientmap_pars_fragment:mp,lightmap_pars_fragment:gp,lights_lambert_fragment:xp,lights_lambert_pars_fragment:vp,lights_pars_begin:_p,lights_toon_fragment:Mp,lights_toon_pars_fragment:bp,lights_phong_fragment:Sp,lights_phong_pars_fragment:Ep,lights_physical_fragment:Tp,lights_physical_pars_fragment:wp,lights_fragment_begin:Ap,lights_fragment_maps:Rp,lights_fragment_end:Cp,lightprobes_pars_fragment:Pp,logdepthbuf_fragment:Ip,logdepthbuf_pars_fragment:Lp,logdepthbuf_pars_vertex:Dp,logdepthbuf_vertex:Np,map_fragment:Fp,map_pars_fragment:Up,map_particle_fragment:Op,map_particle_pars_fragment:Bp,metalnessmap_fragment:zp,metalnessmap_pars_fragment:Hp,morphinstance_vertex:Vp,morphcolor_vertex:Gp,morphnormal_vertex:kp,morphtarget_pars_vertex:Wp,morphtarget_vertex:Xp,normal_fragment_begin:qp,normal_fragment_maps:Yp,normal_pars_fragment:Zp,normal_pars_vertex:Jp,normal_vertex:$p,normalmap_pars_fragment:Kp,clearcoat_normal_fragment_begin:jp,clearcoat_normal_fragment_maps:Qp,clearcoat_pars_fragment:em,iridescence_pars_fragment:tm,opaque_fragment:nm,packing:im,premultiplied_alpha_fragment:sm,project_vertex:rm,dithering_fragment:om,dithering_pars_fragment:am,roughnessmap_fragment:lm,roughnessmap_pars_fragment:cm,shadowmap_pars_fragment:um,shadowmap_pars_vertex:hm,shadowmap_vertex:dm,shadowmask_pars_fragment:fm,skinbase_vertex:pm,skinning_pars_vertex:mm,skinning_vertex:gm,skinnormal_vertex:xm,specularmap_fragment:vm,specularmap_pars_fragment:_m,tonemapping_fragment:ym,tonemapping_pars_fragment:Mm,transmission_fragment:bm,transmission_pars_fragment:Sm,uv_pars_fragment:Em,uv_pars_vertex:Tm,uv_vertex:wm,worldpos_vertex:Am,background_vert:Rm,background_frag:Cm,backgroundCube_vert:Pm,backgroundCube_frag:Im,cube_vert:Lm,cube_frag:Dm,depth_vert:Nm,depth_frag:Fm,distance_vert:Um,distance_frag:Om,equirect_vert:Bm,equirect_frag:zm,linedashed_vert:Hm,linedashed_frag:Vm,meshbasic_vert:Gm,meshbasic_frag:km,meshlambert_vert:Wm,meshlambert_frag:Xm,meshmatcap_vert:qm,meshmatcap_frag:Ym,meshnormal_vert:Zm,meshnormal_frag:Jm,meshphong_vert:$m,meshphong_frag:Km,meshphysical_vert:jm,meshphysical_frag:Qm,meshtoon_vert:e0,meshtoon_frag:t0,points_vert:n0,points_frag:i0,shadow_vert:s0,shadow_frag:r0,sprite_vert:o0,sprite_frag:a0},xe={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},qn={basic:{uniforms:nn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:nn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new fe(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:nn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:nn([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:nn([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new fe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:nn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:nn([xe.points,xe.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:nn([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:nn([xe.common,xe.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:nn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:nn([xe.sprite,xe.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:nn([xe.common,xe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:nn([xe.lights,xe.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};qn.physical={uniforms:nn([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};var Ga={r:0,b:0,g:0},l0=new ke,Uh=new ze;Uh.set(-1,0,0,0,1,0,0,0,1);function c0(i,e,t,n,s,r){let o=new fe(0),a=s===!0?0:1,l,c,u=null,p=0,d=null;function h(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){let y=_.backgroundBlurriness>0;E=e.get(E,y)}return E}function f(_){let E=!1,y=h(_);y===null?g(o,a):y&&y.isColor&&(g(y,1),E=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,E){let y=h(E);y&&y.isCubeTexture?(c===void 0&&(c=new We(new Dn(1,1,1),new mt({name:"BackgroundCubeMaterial",uniforms:Xi(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(l0.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Uh),c.material.toneMapped=$e.getTransfer(y.colorSpace)!==rt,(u!==y||p!==y.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,p=y.version,d=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new We(new Tn(2,2),new mt({name:"BackgroundMaterial",uniforms:Xi(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$e.getTransfer(y.colorSpace)!==rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||p!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,p=y.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,E){_.getRGB(Ga,cc(i)),t.buffers.color.setClear(Ga.r,Ga.g,Ga.b,E,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,g(o,a)},render:f,addToRenderList:v,dispose:m}}function u0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(O,B,z,A,k){let V=!1,H=p(O,A,z,B);r!==H&&(r=H,c(r.object)),V=h(O,A,z,k),V&&f(O,A,z,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,y(O,B,z,A),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return i.createVertexArray()}function c(O){return i.bindVertexArray(O)}function u(O){return i.deleteVertexArray(O)}function p(O,B,z,A){let k=A.wireframe===!0,V=n[B.id];V===void 0&&(V={},n[B.id]=V);let H=O.isInstancedMesh===!0?O.id:0,ee=V[H];ee===void 0&&(ee={},V[H]=ee);let Y=ee[z.id];Y===void 0&&(Y={},ee[z.id]=Y);let Q=Y[k];return Q===void 0&&(Q=d(l()),Y[k]=Q),Q}function d(O){let B=[],z=[],A=[];for(let k=0;k<t;k++)B[k]=0,z[k]=0,A[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:z,attributeDivisors:A,object:O,attributes:{},index:null}}function h(O,B,z,A){let k=r.attributes,V=B.attributes,H=0,ee=z.getAttributes();for(let Y in ee)if(ee[Y].location>=0){let ne=k[Y],_e=V[Y];if(_e===void 0&&(Y==="instanceMatrix"&&O.instanceMatrix&&(_e=O.instanceMatrix),Y==="instanceColor"&&O.instanceColor&&(_e=O.instanceColor)),ne===void 0||ne.attribute!==_e||_e&&ne.data!==_e.data)return!0;H++}return r.attributesNum!==H||r.index!==A}function f(O,B,z,A){let k={},V=B.attributes,H=0,ee=z.getAttributes();for(let Y in ee)if(ee[Y].location>=0){let ne=V[Y];ne===void 0&&(Y==="instanceMatrix"&&O.instanceMatrix&&(ne=O.instanceMatrix),Y==="instanceColor"&&O.instanceColor&&(ne=O.instanceColor));let _e={};_e.attribute=ne,ne&&ne.data&&(_e.data=ne.data),k[Y]=_e,H++}r.attributes=k,r.attributesNum=H,r.index=A}function v(){let O=r.newAttributes;for(let B=0,z=O.length;B<z;B++)O[B]=0}function g(O){m(O,0)}function m(O,B){let z=r.newAttributes,A=r.enabledAttributes,k=r.attributeDivisors;z[O]=1,A[O]===0&&(i.enableVertexAttribArray(O),A[O]=1),k[O]!==B&&(i.vertexAttribDivisor(O,B),k[O]=B)}function _(){let O=r.newAttributes,B=r.enabledAttributes;for(let z=0,A=B.length;z<A;z++)B[z]!==O[z]&&(i.disableVertexAttribArray(z),B[z]=0)}function E(O,B,z,A,k,V,H){H===!0?i.vertexAttribIPointer(O,B,z,k,V):i.vertexAttribPointer(O,B,z,A,k,V)}function y(O,B,z,A){v();let k=A.attributes,V=z.getAttributes(),H=B.defaultAttributeValues;for(let ee in V){let Y=V[ee];if(Y.location>=0){let Q=k[ee];if(Q===void 0&&(ee==="instanceMatrix"&&O.instanceMatrix&&(Q=O.instanceMatrix),ee==="instanceColor"&&O.instanceColor&&(Q=O.instanceColor)),Q!==void 0){let ne=Q.normalized,_e=Q.itemSize,we=e.get(Q);if(we===void 0)continue;let ie=we.buffer,pe=we.type,Me=we.bytesPerElement,Pe=pe===i.INT||pe===i.UNSIGNED_INT||Q.gpuType===ta;if(Q.isInterleavedBufferAttribute){let he=Q.data,Fe=he.isInterleavedBuffer===!0?he.stride:he.itemSize,yt=Q.offset;if(he.isInstancedInterleavedBuffer||he.isInstancedBufferAttribute){for(let Ae=0;Ae<Y.locationSize;Ae++)m(Y.location+Ae,he.meshPerAttribute);O.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ae=0;Ae<Y.locationSize;Ae++)g(Y.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Ae=0;Ae<Y.locationSize;Ae++)E(Y.location+Ae,_e/Y.locationSize,pe,ne,Fe*Me,(yt+_e/Y.locationSize*Ae)*Me,Pe)}else{if(Q.isInstancedBufferAttribute){for(let he=0;he<Y.locationSize;he++)m(Y.location+he,Q.meshPerAttribute);O.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let he=0;he<Y.locationSize;he++)g(Y.location+he);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let he=0;he<Y.locationSize;he++)E(Y.location+he,_e/Y.locationSize,pe,ne,_e*Me,_e/Y.locationSize*he*Me,Pe)}}else if(H!==void 0){let ne=H[ee];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(Y.location,ne);break;case 3:i.vertexAttrib3fv(Y.location,ne);break;case 4:i.vertexAttrib4fv(Y.location,ne);break;default:i.vertexAttrib1fv(Y.location,ne)}}}}_()}function w(){F();for(let O in n){let B=n[O];for(let z in B){let A=B[z];for(let k in A){let V=A[k];for(let H in V)u(V[H].object),delete V[H];delete A[k]}}delete n[O]}}function T(O){if(n[O.id]===void 0)return;let B=n[O.id];for(let z in B){let A=B[z];for(let k in A){let V=A[k];for(let H in V)u(V[H].object),delete V[H];delete A[k]}}delete n[O.id]}function x(O){for(let B in n){let z=n[B];for(let A in z){let k=z[A];if(k[O.id]===void 0)continue;let V=k[O.id];for(let H in V)u(V[H].object),delete V[H];delete k[O.id]}}}function b(O){for(let B in n){let z=n[B],A=O.isInstancedMesh===!0?O.id:0,k=z[A];if(k!==void 0){for(let V in k){let H=k[V];for(let ee in H)u(H[ee].object),delete H[ee];delete k[V]}delete z[A],Object.keys(z).length===0&&delete n[B]}}}function F(){D(),o=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:F,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:x,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function h0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let h=0;h<u;h++)d+=c[h];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function d0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==vn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let b=x===Jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==dn&&x!==wn&&!b&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ue("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&p===!1;t.reversedDepthBuffer===!0&&p===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&p===!0&&Ue("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:p,maxTextures:h,maxVertexTextures:f,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:T}}function f0(i){let e=this,t=null,n=0,s=!1,r=!1,o=new hn,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){let h=p.length!==0||d||n!==0||s;return s=d,n=p.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){t=u(p,d,0)},this.setState=function(p,d,h){let f=p.clippingPlanes,v=p.clipIntersection,g=p.clipShadows,m=i.get(p);if(!s||f===null||f.length===0||r&&!g)r?u(null):c();else{let _=r?0:n,E=_*4,y=m.clippingState||null;l.value=y,y=u(f,d,E,h);for(let w=0;w!==E;++w)y[w]=t[w];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(p,d,h,f){let v=p!==null?p.length:0,g=null;if(v!==0){if(g=l.value,f!==!0||g===null){let m=h+v*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,y=h;E!==v;++E,y+=4)o.copy(p[E]).applyMatrix4(_,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var Rr=class extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new or(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Dn(5,5,5),r=new mt({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Lt,blending:Hi});r.uniforms.tEquirect.value=t;let o=new We(s,r),a=t.minFilter;return t.minFilter===li&&(t.minFilter=bt),new Ts(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},ph=256,p0=3,m0=20,Oh=256,Bh=16,g0=3,x0=new P,v0=new fe,Wa=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ts(1,10,null),this._boxMesh=new We(new Dn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=x0}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let p=l.autoClear,d=l.autoClearColor,h=l.autoClearDepth,f=l.autoClearStencil,v=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(e.background=l.getClearColor(v0));let g=new Ts(n,s,u);return g.position.copy(a),g.update(l,e),l.autoClear=p,l.autoClearColor=d,l.autoClearDepth=h,l.autoClearStencil=f,e.background=v,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(ph,ah(e))}_fromTexture(e,t){e.mapping===Gi||e.mapping===Rs?this._setSize(e.image.length===0?ph:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=mh(e,!1,!1),n=Math.log2(e)-p0;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=mh(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Gi||e.mapping===Rs?(this._cubemapMaterial===null&&(this._cubemapMaterial=xh()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=gh()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=_0(),this._integrationMaterial=y0());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Bh);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-g0)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(Oh*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=M0());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function mh(i,e,t){return new Rr(i,{minFilter:li,generateMipmaps:e,type:Jt,colorSpace:Ks,depthBuffer:t})}function Cr(i,e,t){return new mt({name:i,uniforms:e,vertexShader:Ve.cube_vert,fragmentShader:t,side:Lt,blending:Hi,depthTest:!1,depthWrite:!1})}function _0(){return Cr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Oh}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function y0(){return Cr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Bh}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function M0(){return Cr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${m0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function gh(){return Cr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function xh(){return Cr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function b0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,h=!1){return d==null?null:h?o(d):r(d)}function r(d){if(d&&d.isTexture){let h=d.mapping;if(h===jo||h===Qo)if(e.has(d)){let f=e.get(d).texture;return a(f,d.mapping)}else{let f=d.image;if(f&&f.height>0){let v=new Rr(f.height);return v.fromEquirectangularTexture(i,d),e.set(d,v),d.addEventListener("dispose",c),a(v.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let h=d.mapping,f=h===jo||h===Qo,v=h===Gi||h===Rs;if(f||v){let g=t.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new Wa(i)),g=f?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let _=d.image;return f&&_&&_.height>0||v&&_&&l(_)?(n===null&&(n=new Wa(i)),g=f?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function a(d,h){return h===jo?d.mapping=Gi:h===Qo&&(d.mapping=Rs),d}function l(d){let h=0,f=6;for(let v=0;v<f;v++)d[v]!==void 0&&h++;return h===f}function c(d){let h=d.target;h.removeEventListener("dispose",c);let f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function u(d){let h=d.target;h.removeEventListener("dispose",u);let f=t.get(h);f!==void 0&&(t.delete(h),f.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function S0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ys("WebGLRenderer: "+n+" extension not supported."),s}}}function E0(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(f=>delete s[f]);function a(f){l(f.target)}function l(f){f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id],o.unregister(f);let v=r.get(f);v&&(e.remove(v),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(f,v){return s[v.id]!==void 0||(v.addEventListener("dispose",a),s[v.id]=new WeakRef(v),o.register(v,v.id,v),t.memory.geometries++),v}function u(f){let v=f.attributes;for(let g in v)e.update(v[g],i.ARRAY_BUFFER)}function p(f){let v=f.index,g=f.attributes.position,m=0;if(g===void 0)return;let _=v!==null?v.array.length:g.array.length/3-1,E=g.count>=65535?sr:ir,y=new E(Math.ceil(_/3)*6,1),w=y.array;if(v!==null){let x=v.array;m=v.version;for(let b=0,F=0;b<_;b+=3){let D=x[b+0],O=x[b+1],B=x[b+2];w[F++]=D,w[F++]=O,w[F++]=O,w[F++]=B,w[F++]=B,w[F++]=D}}else{m=g.version;for(let x=0,b=0;x<_;x+=3){let F=x+0,D=x+1,O=x+2;w[b++]=F,w[b++]=D,w[b++]=D,w[b++]=O,w[b++]=O,w[b++]=F}}y.version=m;let T=r.get(f);T&&e.remove(T),r.set(f,y)}function d(f){let v=r.get(f);if(v){let g=f.index;g!==null&&v.version<g.version&&p(f)}else p(f);return r.get(f)}function h(){for(let f in s){let v=s[f].deref();v!==void 0&&l(v)}}return{get:c,update:u,getWireframeAttribute:d,dispose:h}}function T0(i,e,t){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,d){i.drawElements(n,d,r,p*o),t.update(d,n,1)}function c(p,d,h){h!==0&&(i.drawElementsInstanced(n,d,r,p*o,h),t.update(d,n,h))}function u(p,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,h);let v=0;for(let g=0;g<h;g++)v+=d[g];t.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function w0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Oe("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function A0(i,e,t){let n=new WeakMap,s=new lt;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==p){let F=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();let h=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],E=0;h===!0&&(E=1),f===!0&&(E=2),v===!0&&(E=3);let y=a.attributes.position.count*E,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*w*4*p),x=new tr(T,y,w,p);x.type=wn,x.needsUpdate=!0;let b=E*4;for(let D=0;D<p;D++){let O=g[D],B=m[D],z=_[D],A=y*w*4*D;for(let k=0;k<O.count;k++){let V=k*b;h===!0&&(s.fromBufferAttribute(O,k),T[A+V+0]=s.x,T[A+V+1]=s.y,T[A+V+2]=s.z,T[A+V+3]=0),f===!0&&(s.fromBufferAttribute(B,k),T[A+V+4]=s.x,T[A+V+5]=s.y,T[A+V+6]=s.z,T[A+V+7]=0),v===!0&&(s.fromBufferAttribute(z,k),T[A+V+8]=s.x,T[A+V+9]=s.y,T[A+V+10]=s.z,T[A+V+11]=z.itemSize===4?s.w:1)}}d={count:p,texture:x,size:new ue(y,w)},n.set(a,d),a.addEventListener("dispose",F)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let h=0;for(let v=0;v<c.length;v++)h+=c[v];let f=a.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",f),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function R0(i,e,t,n,s){let r=new WeakMap;function o(c){let u=s.render.frame,p=c.geometry,d=e.get(c,p);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var C0={[Wl]:"LINEAR_TONE_MAPPING",[Xl]:"REINHARD_TONE_MAPPING",[ql]:"CINEON_TONE_MAPPING",[vr]:"ACES_FILMIC_TONE_MAPPING",[Zl]:"AGX_TONE_MAPPING",[Jl]:"NEUTRAL_TONE_MAPPING",[Yl]:"CUSTOM_TONE_MAPPING"};function P0(i,e,t,n,s,r){let o=new Zt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,u=new je;u.setAttribute("position",new be([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new be([0,2,0,0,2,0],2));let p=new Oo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new We(u,p),h=new oi(-1,1,1,-1,0,1),f=null,v=null,g=!1,m,_=null,E=[],y=!1;this.setSize=function(w,T){o.setSize(w,T),a!==null&&a.setSize(w,T),l!==null&&l.setSize(w,T);for(let x=0;x<E.length;x++){let b=E[x];b.setSize&&b.setSize(w,T)}},this.setEffects=function(w){E=w,y=E.length>0&&E[0].isRenderPass===!0;let T=o.width,x=o.height;E.length>0&&a===null&&(a=new Zt(T,x,{type:Jt,depthBuffer:!1,stencilBuffer:!1}),l=new Zt(T,x,{type:Jt,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&E.some(F=>F.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&c===null&&(c=new Ln(T,x),r===!0&&(c.format=ci,c.type=ki)),o.dispose(),o.depthTexture=b?c:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let F=0;F<E.length;F++){let D=E[F];D.setSize&&D.setSize(T,x),b&&D.needsDepthTexture===!0&&D.setDepthTexture&&D.setDepthTexture(c)}},this.begin=function(w,T){if(g||w.toneMapping===Wn&&E.length===0)return!1;if(_=T,T!==null){let x=T.width,b=T.height;(o.width!==x||o.height!==b)&&this.setSize(x,b)}return y===!1&&w.setRenderTarget(o),m=w.toneMapping,w.toneMapping=Wn,!0},this.hasRenderPass=function(){return y},this.end=function(w,T){w.toneMapping=m,g=!0;let x=o,b=a;for(let F=0;F<E.length;F++){let D=E[F];D.enabled!==!1&&(D.render(w,b,x,T),D.needsSwap!==!1&&(x=b,b=b===a?l:a))}if(f!==w.outputColorSpace||v!==w.toneMapping){f=w.outputColorSpace,v=w.toneMapping,p.defines={},$e.getTransfer(f)===rt&&(p.defines.SRGB_TRANSFER="");let F=C0[v];F&&(p.defines[F]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(_),w.render(d,h),_=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),u.dispose(),p.dispose()}}var zh=new Yt,Hh=new Ln(1,1),Vh=new ar(1),Gh=new tr,kh=new To,Wh=new or,vh=[],_h=[],yh=new Float32Array(16),Mh=new Float32Array(9),bh=new Float32Array(4);function Is(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=vh[s];if(r===void 0&&(r=new Float32Array(s),vh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function qa(i,e){let t=_h[e];t===void 0&&(t=new Int32Array(e),_h[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function I0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function L0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function D0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function N0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function F0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;bh.set(n),i.uniformMatrix2fv(this.addr,!1,bh),Nt(t,n)}}function U0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;Mh.set(n),i.uniformMatrix3fv(this.addr,!1,Mh),Nt(t,n)}}function O0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;yh.set(n),i.uniformMatrix4fv(this.addr,!1,yh),Nt(t,n)}}function B0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function H0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function V0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function G0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function k0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function W0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function X0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function Ya(i){return i.version===0&&(i.compareFunction=rc,i.needsUpdate=!0),i}function q0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Ya(Hh):r=zh,t.setTexture2D(e||r,s)}function Y0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kh,s)}function Z0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Ya(Vh):r=Wh,t.setTextureCube(e||r,s)}function J0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Gh,s)}function $0(i){switch(i){case 5126:return I0;case 35664:return L0;case 35665:return D0;case 35666:return N0;case 35674:return F0;case 35675:return U0;case 35676:return O0;case 5124:case 35670:return B0;case 35667:case 35671:return z0;case 35668:case 35672:return H0;case 35669:case 35673:return V0;case 5125:return G0;case 36294:return k0;case 36295:return W0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return Y0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}function K0(i,e){i.uniform1fv(this.addr,e)}function j0(i,e){let t=Is(e,this.size,2);i.uniform2fv(this.addr,t)}function Q0(i,e){let t=Is(e,this.size,3);i.uniform3fv(this.addr,t)}function eg(i,e){let t=Is(e,this.size,4);i.uniform4fv(this.addr,t)}function tg(i,e){let t=Is(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ng(i,e){let t=Is(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ig(i,e){let t=Is(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function sg(i,e){i.uniform1iv(this.addr,e)}function rg(i,e){i.uniform2iv(this.addr,e)}function og(i,e){i.uniform3iv(this.addr,e)}function ag(i,e){i.uniform4iv(this.addr,e)}function lg(i,e){i.uniform1uiv(this.addr,e)}function cg(i,e){i.uniform2uiv(this.addr,e)}function ug(i,e){i.uniform3uiv(this.addr,e)}function hg(i,e){i.uniform4uiv(this.addr,e)}function dg(i,e,t){let n=this.cache,s=e.length,r=qa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ya(Hh):o=zh;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function fg(i,e,t){let n=this.cache,s=e.length,r=qa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||kh,r[o])}function pg(i,e,t){let n=this.cache,s=e.length,r=qa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Ya(Vh):o=Wh;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function mg(i,e,t){let n=this.cache,s=e.length,r=qa(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Gh,r[o])}function gg(i){switch(i){case 5126:return K0;case 35664:return j0;case 35665:return Q0;case 35666:return eg;case 35674:return tg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return og;case 35669:case 35673:return ag;case 5125:return lg;case 36294:return cg;case 36295:return ug;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}var yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$0(t.type)}},Mc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gg(t.type)}},bc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},vc=/(\w+)(\])?(\[|\.)?/g;function Sh(i,e){i.seq.push(e),i.map[e.id]=e}function xg(i,e,t){let n=i.name,s=n.length;for(vc.lastIndex=0;;){let r=vc.exec(n),o=vc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Sh(t,c===void 0?new yc(a,i,e):new Mc(a,i,e));break}else{let p=t.map[a];p===void 0&&(p=new bc(a),Sh(t,p)),t=p}}}var Ps=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);xg(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Eh(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var vg=37297,_g=0;function yg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Th=new ze;function Mg(i){$e._getMatrix(Th,$e.workingColorSpace,i);let e=`mat3( ${Th.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case js:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function wh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+yg(i.getShaderSource(e),a)}else return r}function bg(i,e){let t=Mg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Sg={[Wl]:"Linear",[Xl]:"Reinhard",[ql]:"Cineon",[vr]:"ACESFilmic",[Zl]:"AgX",[Jl]:"Neutral",[Yl]:"Custom"};function Eg(i,e){let t=Sg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ka=new P;function Tg(){$e.getLuminanceCoefficients(ka);let i=ka.x.toFixed(4),e=ka.y.toFixed(4),t=ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function Ag(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rg(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ar(i){return i!==""}function Ah(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Rh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sc(i){return i.replace(Cg,Pg)}function Pg(i,e){let t=Ve[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Sc(t)}var Ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ch(i){return i.replace(Ig,Lg)}function Lg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ph(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Dg={[xr]:"SHADOWMAP_TYPE_PCF",[ws]:"SHADOWMAP_TYPE_VSM"};function Ng(i){return Dg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Fg={[Rs]:"ENVMAP_MODE_REFRACTION"};function Ug(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Fg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Og={[kl]:"ENVMAP_BLENDING_MULTIPLY",[qu]:"ENVMAP_BLENDING_MIX",[Yu]:"ENVMAP_BLENDING_ADD"};function Bg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Og[i.combine]||"ENVMAP_BLENDING_NONE"}function zg(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Ng(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=Ug(t),p=Bg(t),d=wg(t),h=Ag(r),f=s.createProgram(),v,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ar).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ar).join(`
`),g.length>0&&(g+=`
`)):(v=[Ph(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),g=[Ph(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Wn?Eg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,bg("linearToOutputTexel",t.outputColorSpace),Tg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ar).join(`
`)),o=Sc(o),o=Ah(o,t),o=Rh(o,t),a=Sc(a),a=Ah(a,t),a=Rh(a,t),o=Ch(o),a=Ch(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,v=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",t.glslVersion===ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=m+v+o,E=m+g+a,y=Eh(s,s.VERTEX_SHADER,_),w=Eh(s,s.FRAGMENT_SHADER,E);s.attachShader(f,y),s.attachShader(f,w),t.index0AttributeName!==void 0?s.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(f,0,"position"),s.linkProgram(f);function T(D){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(f)||"",B=s.getShaderInfoLog(y)||"",z=s.getShaderInfoLog(w)||"",A=O.trim(),k=B.trim(),V=z.trim(),H=!0,ee=!0;if(s.getProgramParameter(f,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,f,y,w);else{let Y=wh(s,y,"vertex"),Q=wh(s,w,"fragment");Oe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(f,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+A+`
`+Y+`
`+Q)}else A!==""?Ue("WebGLProgram: Program Info Log:",A):(k===""||V==="")&&(ee=!1);ee&&(D.diagnostics={runnable:H,programLog:A,vertexShader:{log:k,prefix:v},fragmentShader:{log:V,prefix:g}})}s.deleteShader(y),s.deleteShader(w),x=new Ps(s,f),b=Rg(s,f)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(f,vg)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_g++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=y,this.fragmentShader=w,this}var Hg=0,Ec=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Tc(e),t.set(e,n)),n}},Tc=class{constructor(e){this.id=Hg++,this.code=e,this.usedTimes=0}};function Vg(i){return i===Ri||i===Er||i===Tr}function Gg(i,e,t,n,s,r){let o=new _s,a=new Ec,l=new Set,c=[],u=new Map,p=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(x){return l.add(x),x===0?"uv":`uv${x}`}function f(x,b,F,D,O,B){let z=D.fog,A=O.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,H=e.get(x.envMap||k,V),ee=d[x.type],Y=n.precision;x.precision!==null&&(Y=n.getMaxPrecision(x.precision),Y!==x.precision&&Ue("WebGLProgram.getParameters:",x.precision,"not supported, using",Y,"instead."));let Q=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,ne=Q!==void 0?Q.length:0,_e=0;A.morphAttributes.position!==void 0&&(_e=1),A.morphAttributes.normal!==void 0&&(_e=2),A.morphAttributes.color!==void 0&&(_e=3);let we,ie,pe,Me;if(ee){let ge=qn[ee];we=ge.vertexShader,ie=ge.fragmentShader}else{we=x.vertexShader,ie=x.fragmentShader;let ge=a.getVertexShaderStage(x),at=a.getFragmentShaderStage(x);a.update(x,ge,at),pe=ge.id,Me=at.id}let Pe=i.getRenderTarget(),he=i.state.buffers.depth.getReversed(),Fe=O.isInstancedMesh===!0,yt=O.isBatchedMesh===!0,Ae=!!x.map,qe=!!x.matcap,Qe=!!H,Be=Qe&&H.isPMREMTexture===!0,ft=!!x.aoMap,et=!!x.lightMap,It=!!x.bumpMap&&x.wireframe===!1,ot=!!x.normalMap,ln=!!x.displacementMap,ct=!!x.emissiveMap,wt=!!x.metalnessMap,Wt=!!x.roughnessMap,Rt=x.anisotropy>0,X=x.clearcoat>0,Mt=x.diffuseRoughness>0,nt=x.dispersion>0,it=x.retroreflectivity>0,ce=x.iridescence>0,ut=x.sheen>0,Re=x.transmission>0,De=Rt&&!!x.anisotropyMap,L=X&&!!x.clearcoatMap,M=X&&!!x.clearcoatNormalMap,I=X&&!!x.clearcoatRoughnessMap,q=Mt&&!!x.diffuseRoughnessMap,R=ce&&!!x.iridescenceMap,Z=ce&&!!x.iridescenceThicknessMap,U=ut&&!!x.sheenColorMap,C=ut&&!!x.sheenRoughnessMap,W=!!x.specularMap,se=!!x.specularColorMap,N=!!x.specularIntensityMap,K=Re&&!!x.transmissionMap,j=Re&&!!x.thicknessMap,oe=!!x.gradientMap,ae=!!x.alphaMap,le=x.alphaTest>0,ye=!!x.alphaHash,Ne=!!x.extensions,re=Wn;x.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(re=i.toneMapping);let Ie=Be?H.isCompressedCubeTexture?H.image[0].mipmaps:H.mipmaps:null,Ge={shaderID:ee,shaderType:x.type,shaderName:x.name,vertexShader:we,fragmentShader:ie,defines:x.defines,customVertexShaderID:pe,customFragmentShaderID:Me,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:Y,batching:yt,batchingColor:yt&&O._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&O.instanceColor!==null,instancingMorph:Fe&&O.morphTexture!==null,outputColorSpace:Pe===null?i.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ae,matcap:qe,envMap:Qe,envMapMode:Qe&&H.mapping,envMapPMREM:Be,envMapMaxLod:Be?Ie.length-1:null,envMapSize:Be?Ie[0].width:null,aoMap:ft,lightMap:et,bumpMap:It,normalMap:ot,displacementMap:ln,emissiveMap:ct,normalMapObjectSpace:ot&&x.normalMapType===$u,normalMapTangentSpace:ot&&x.normalMapType===za,packedNormalMap:ot&&x.normalMapType===za&&Vg(x.normalMap.format),metalnessMap:wt,roughnessMap:Wt,anisotropy:Rt,anisotropyMap:De,clearcoat:X,clearcoatMap:L,clearcoatNormalMap:M,clearcoatRoughnessMap:I,diffuseRoughness:Mt,diffuseRoughnessMap:q,dispersion:nt,retroreflection:it,iridescence:ce,iridescenceMap:R,iridescenceThicknessMap:Z,sheen:ut,sheenColorMap:U,sheenRoughnessMap:C,specularMap:W,specularColorMap:se,specularIntensityMap:N,transmission:Re,transmissionMap:K,thicknessMap:j,gradientMap:oe,opaque:x.transparent===!1&&x.blending===As&&x.alphaToCoverage===!1,alphaMap:ae,alphaTest:le,alphaHash:ye,combine:x.combine,mapUv:Ae&&h(x.map.channel),aoMapUv:ft&&h(x.aoMap.channel),lightMapUv:et&&h(x.lightMap.channel),bumpMapUv:It&&h(x.bumpMap.channel),normalMapUv:ot&&h(x.normalMap.channel),displacementMapUv:ln&&h(x.displacementMap.channel),emissiveMapUv:ct&&h(x.emissiveMap.channel),metalnessMapUv:wt&&h(x.metalnessMap.channel),roughnessMapUv:Wt&&h(x.roughnessMap.channel),anisotropyMapUv:De&&h(x.anisotropyMap.channel),clearcoatMapUv:L&&h(x.clearcoatMap.channel),clearcoatNormalMapUv:M&&h(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:I&&h(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:q&&h(x.diffuseRoughnessMap.channel),iridescenceMapUv:R&&h(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&h(x.iridescenceThicknessMap.channel),sheenColorMapUv:U&&h(x.sheenColorMap.channel),sheenRoughnessMapUv:C&&h(x.sheenRoughnessMap.channel),specularMapUv:W&&h(x.specularMap.channel),specularColorMapUv:se&&h(x.specularColorMap.channel),specularIntensityMapUv:N&&h(x.specularIntensityMap.channel),transmissionMapUv:K&&h(x.transmissionMap.channel),thicknessMapUv:j&&h(x.thicknessMap.channel),alphaMapUv:ae&&h(x.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(ot||Rt),vertexNormals:!!A.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!A.attributes.uv&&(Ae||ae),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||A.attributes.normal===void 0&&ot===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:he,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:A.attributes.position!==void 0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:_e,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:B.filter(ge=>ge.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:re,decodeVideoTexture:Ae&&x.map.isVideoTexture===!0&&$e.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:ct&&x.emissiveMap.isVideoTexture===!0&&$e.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Gt,flipSided:x.side===Lt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ne&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&x.extensions.multiDraw===!0||yt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ge.vertexUv1s=l.has(1),Ge.vertexUv2s=l.has(2),Ge.vertexUv3s=l.has(3),l.clear(),Ge}function v(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let F in x.defines)b.push(F),b.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(g(b,x),m(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function g(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapPMREM),x.push(b.envMapMaxLod),x.push(b.envMapSize),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.diffuseRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.numLightProbeGrids),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function m(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function _(x){let b=d[x.type],F;if(b){let D=qn[b];F=Va.clone(D.uniforms)}else F=x.uniforms;return F}function E(x,b){let F=u.get(b);return F!==void 0?++F.usedTimes:(F=new zg(i,b,x,s),c.push(F),u.set(b,F)),F}function y(x){if(--x.usedTimes===0){let b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function T(){a.dispose()}return{getParameters:f,getProgramCacheKey:v,getUniforms:_,acquireProgram:E,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:T}}function kg(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Wg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ih(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Lh(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function a(d,h,f,v,g,m){let _=i[e];return _===void 0?(_={id:d.id,object:d,geometry:h,material:f,materialVariant:o(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:m},i[e]=_):(_.id=d.id,_.object=d,_.geometry=h,_.material=f,_.materialVariant=o(d),_.groupOrder=v,_.renderOrder=d.renderOrder,_.z=g,_.group=m),e++,_}function l(d,h,f,v,g,m,_){_.reversedDepth===!0&&(g=-g);let E=a(d,h,f,v,g,m);f.transmission>0?n.push(E):f.transparent===!0?s.push(E):t.push(E)}function c(d,h,f,v,g,m){let _=a(d,h,f,v,g,m);f.transmission>0?n.unshift(_):f.transparent===!0?s.unshift(_):t.unshift(_)}function u(d,h){t.length>1&&t.sort(d||Wg),n.length>1&&n.sort(h||Ih),s.length>1&&s.sort(h||Ih)}function p(){for(let d=e,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:u}}function Xg(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Lh,i.set(n,[o])):s>=r.length?(o=new Lh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function qg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new fe};break;case"SpotLight":t={position:new P,direction:new P,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Yg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Zg=0;function Jg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $g(i){let e=new qg,t=Yg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let s=new P,r=new ke,o=new ke;function a(c){let u=0,p=0,d=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let h=0,f=0,v=0,g=0,m=0,_=0,E=0,y=0,w=0,T=0,x=0,b=0,F=0,D=0;c.sort(Jg);for(let B=0,z=c.length;B<z;B++){let A=c[B],k=A.color,V=A.intensity,H=A.distance,ee=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Ri?ee=A.shadow.map.texture:ee=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)u+=k.r*V,p+=k.g*V,d+=k.b*V;else if(A.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(A.sh.coefficients[Y],V);D++}else if(A.isSunLight){let Y=e.get(A);if(Y.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let Q=A.shadow,ne=t.get(A);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[f]=ne,n.sunShadowMap[f]=ee;let _e=Q.getViewportCount();for(let we=0;we<_e;we++)n.sunShadowMatrix[v+we]=Q.getMatrix(we),n.sunShadowCascade[v+we]=Q._cascadeData[we];v+=_e,f++}n.sun[h]=Y,h++}else if(A.isDirectionalLight){let Y=e.get(A);if(Y.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let Q=A.shadow,ne=t.get(A);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,n.directionalShadow[g]=ne,n.directionalShadowMap[g]=ee,n.directionalShadowMatrix[g]=A.shadow.matrix,w++}n.directional[g]=Y,g++}else if(A.isSpotLight){let Y=e.get(A);Y.position.setFromMatrixPosition(A.matrixWorld),Y.color.copy(k).multiplyScalar(V),Y.distance=H,Y.coneCos=Math.cos(A.angle),Y.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),Y.decay=A.decay,n.spot[_]=Y;let Q=A.shadow;if(A.map&&(n.spotLightMap[b]=A.map,b++,Q.updateMatrices(A),A.castShadow&&F++),n.spotLightMatrix[_]=Q.matrix,A.castShadow){let ne=t.get(A);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,n.spotShadow[_]=ne,n.spotShadowMap[_]=ee,x++}_++}else if(A.isRectAreaLight){let Y=e.get(A);Y.color.copy(k).multiplyScalar(V),Y.halfWidth.set(A.width*.5,0,0),Y.halfHeight.set(0,A.height*.5,0),n.rectArea[E]=Y,E++}else if(A.isPointLight){let Y=e.get(A);if(Y.color.copy(A.color).multiplyScalar(A.intensity),Y.distance=A.distance,Y.decay=A.decay,A.castShadow){let Q=A.shadow,ne=t.get(A);ne.shadowIntensity=Q.intensity,ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,ne.shadowCameraNear=Q.camera.near,ne.shadowCameraFar=Q.camera.far,n.pointShadow[m]=ne,n.pointShadowMap[m]=ee,n.pointShadowMatrix[m]=A.shadow.matrix,T++}n.point[m]=Y,m++}else if(A.isHemisphereLight){let Y=e.get(A);Y.skyColor.copy(A.color).multiplyScalar(V),Y.groundColor.copy(A.groundColor).multiplyScalar(V),n.hemi[y]=Y,y++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=d;let O=n.hash;(O.sunLength!==h||O.directionalLength!==g||O.pointLength!==m||O.spotLength!==_||O.rectAreaLength!==E||O.hemiLength!==y||O.numSunShadows!==f||O.numDirectionalShadows!==w||O.numPointShadows!==T||O.numSpotShadows!==x||O.numSpotMaps!==b||O.numLightProbes!==D)&&(n.sun.length=h,n.directional.length=g,n.spot.length=_,n.rectArea.length=E,n.point.length=m,n.hemi.length=y,n.sunShadow.length=f,n.sunShadowMap.length=f,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+b-F,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=D,O.sunLength=h,O.directionalLength=g,O.pointLength=m,O.spotLength=_,O.rectAreaLength=E,O.hemiLength=y,O.numSunShadows=f,O.numDirectionalShadows=w,O.numPointShadows=T,O.numSpotShadows=x,O.numSpotMaps=b,O.numLightProbes=D,n.version=Zg++)}function l(c,u){let p=0,d=0,h=0,f=0,v=0,g=0,m=u.matrixWorldInverse;for(let _=0,E=c.length;_<E;_++){let y=c[_];if(y.isSunLight){let w=n.sun[p];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(m),p++}else if(y.isDirectionalLight){let w=n.directional[d];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),d++}else if(y.isSpotLight){let w=n.spot[f];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let w=n.rectArea[v];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),v++}else if(y.isPointLight){let w=n.point[h];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),h++}else if(y.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Dh(i){let e=new $g(i),t=[],n=[],s=[];function r(p){u.camera=p,t.length=0,n.length=0,s.length=0}function o(p){p.isLightProbeGrid?s.push(p):t.push(p)}function a(p){n.push(p)}function l(){e.setup(t),s.sort((p,d)=>p.priority-d.priority||p.id-d.id)}function c(p){e.setupView(t,p)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Kg(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Dh(i),e.set(s,[a])):r>=o.length?(a=new Dh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var jg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ex=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],tx=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Nh=new ke,wr=new P,_c=new P;function nx(i,e,t){let n=new bi,s=new ue,r=new ue,o=new lt,a=new zi,l=new Bo,c={},u=t.maxTextureSize,p={[Gn]:Lt,[Lt]:Gn,[Gt]:Gt},d=new mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:jg,fragmentShader:Qg}),h=d.clone();h.defines.HORIZONTAL_PASS=1;let f=new je;f.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new We(f,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xr;let m=this.type;this.render=function(T,x,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Au&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=xr);let F=i.getRenderTarget(),D=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Hi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let z=m!==this.type;z&&x.traverse(function(A){A.material&&(Array.isArray(A.material)?A.material.forEach(k=>k.needsUpdate=!0):A.material.needsUpdate=!0)});for(let A=0,k=T.length;A<k;A++){let V=T[A],H=V.shadow;if(H===void 0){Ue("WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let ee=H.getFrameExtents();s.multiply(ee),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ee.x),s.x=r.x*ee.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ee.y),s.y=r.y*ee.y,H.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Y,H.map===null||z===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===ws){if(V.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Zt(s.x,s.y,{format:Ri,type:Jt,minFilter:bt,magFilter:bt,generateMipmaps:!1}),H.map.texture.name=V.name+".shadowMap",H.map.depthTexture=new Ln(s.x,s.y,wn),H.map.depthTexture.name=V.name+".shadowMapDepth",H.map.depthTexture.format=ii,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At}else V.isPointLight?(H.map=new Rr(s.x),H.map.depthTexture=new ar(s.x,Nn)):(H.map=new Zt(s.x,s.y),H.map.depthTexture=new Ln(s.x,s.y,Nn)),H.map.depthTexture.name=V.name+".shadowMap",H.map.depthTexture.format=ii,this.type===xr?(H.map.depthTexture.compareFunction=Y?sc:ic,H.map.depthTexture.minFilter=bt,H.map.depthTexture.magFilter=bt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=At,H.map.depthTexture.magFilter=At);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);let Q=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();V.isPointLight!==!0&&H.updateMatrices(V,b);let ne=(H.camera.layers.mask&4294967294)!==0?H.camera.layers:b.layers;for(let _e=0;_e<Q;_e++){let we=H.getCamera(_e);if(V.isPointLight){let ie=H.camera,pe=H.matrix,Me=V.distance||ie.far;Me!==ie.far&&(ie.far=Me,ie.updateProjectionMatrix()),wr.setFromMatrixPosition(V.matrixWorld),ie.position.copy(wr),_c.copy(ie.position),_c.add(ex[_e]),ie.up.copy(tx[_e]),ie.lookAt(_c),ie.updateMatrixWorld(),pe.makeTranslation(-wr.x,-wr.y,-wr.z),Nh.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Nh,ie.coordinateSystem,ie.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(H.map),i.clear());let ie=H.getViewport(_e);o.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),B.viewport(o)}n=H.getFrustum(_e),y(x,b,we,V,ne,this.type)}H.isPointLightShadow!==!0&&this.type===ws&&_(H,b),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(F,D,O)};function _(T,x){let b=e.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null?T.mapPass=new Zt(s.x,s.y,{format:Ri,type:Jt}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(x,null,b,d,v,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(x,null,b,h,v,null)}function E(T,x,b,F){let D=null,O=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)D=O;else if(D=b.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let B=D.uuid,z=x.uuid,A=c[B];A===void 0&&(A={},c[B]=A);let k=A[z];k===void 0&&(k=D.clone(),A[z]=k,x.addEventListener("dispose",w)),D=k}if(D.visible=x.visible,D.wireframe=x.wireframe,F===ws?D.side=x.shadowSide!==null?x.shadowSide:x.side:D.side=x.shadowSide!==null?x.shadowSide:p[x.side],D.alphaMap=x.alphaMap,D.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,D.map=x.map,D.clipShadows=x.clipShadows,D.clippingPlanes=x.clippingPlanes,D.clipIntersection=x.clipIntersection,D.displacementMap=x.displacementMap,D.displacementScale=x.displacementScale,D.displacementBias=x.displacementBias,D.wireframeLinewidth=x.wireframeLinewidth,D.linewidth=x.linewidth,b.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let B=i.properties.get(D);B.light=b}return D}function y(T,x,b,F,D,O){if(T.visible===!1)return;if(T.layers.test(D)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&O===ws)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);let A=e.update(T),k=T.material;if(Array.isArray(k)){let V=A.groups;for(let H=0,ee=V.length;H<ee;H++){let Y=V[H],Q=k[Y.materialIndex];if(Q&&Q.visible){let ne=E(T,Q,F,O);T.onBeforeShadow(i,T,x,b,A,ne,Y),i.renderBufferDirect(b,null,A,ne,T,Y),T.onAfterShadow(i,T,x,b,A,ne,Y)}}}else if(k.visible){let V=E(T,k,F,O);T.onBeforeShadow(i,T,x,b,A,V,null),i.renderBufferDirect(b,null,A,V,T,null),T.onAfterShadow(i,T,x,b,A,V,null)}}let z=T.children;for(let A=0,k=z.length;A<k;A++)y(z[A],x,b,F,D,O)}function w(T){T.target.removeEventListener("dispose",w);for(let b in c){let F=c[b],D=T.target.uuid;D in F&&(F[D].dispose(),delete F[D])}}}function ix(i,e){function t(){let N=!1,K=new lt,j=null,oe=new lt(0,0,0,0);return{setMask:function(ae){j!==ae&&!N&&(i.colorMask(ae,ae,ae,ae),j=ae)},setLocked:function(ae){N=ae},setClear:function(ae,le,ye,Ne,re){re===!0&&(ae*=Ne,le*=Ne,ye*=Ne),K.set(ae,le,ye,Ne),oe.equals(K)===!1&&(i.clearColor(ae,le,ye,Ne),oe.copy(K))},reset:function(){N=!1,j=null,oe.set(-1,0,0,0)}}}function n(){let N=!1,K=!1,j=null,oe=null,ae=null;return{setReversed:function(le){if(K!==le){let ye=e.get("EXT_clip_control");le?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),K=le;let Ne=ae;ae=null,this.setClear(Ne)}},getReversed:function(){return K},setTest:function(le){le?he(i.DEPTH_TEST):Fe(i.DEPTH_TEST)},setMask:function(le){j!==le&&!N&&(i.depthMask(le),j=le)},setFunc:function(le){if(K&&(le=oh[le]),oe!==le){switch(le){case fo:i.depthFunc(i.NEVER);break;case ps:i.depthFunc(i.ALWAYS);break;case po:i.depthFunc(i.LESS);break;case ms:i.depthFunc(i.LEQUAL);break;case mo:i.depthFunc(i.EQUAL);break;case go:i.depthFunc(i.GEQUAL);break;case xo:i.depthFunc(i.GREATER);break;case vo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=le}},setLocked:function(le){N=le},setClear:function(le){ae!==le&&(ae=le,K&&(le=1-le),i.clearDepth(le))},reset:function(){N=!1,j=null,oe=null,ae=null,K=!1}}}function s(){let N=!1,K=null,j=null,oe=null,ae=null,le=null,ye=null,Ne=null,re=null;return{setTest:function(Ie){N||(Ie?he(i.STENCIL_TEST):Fe(i.STENCIL_TEST))},setMask:function(Ie){K!==Ie&&!N&&(i.stencilMask(Ie),K=Ie)},setFunc:function(Ie,Ge,ge){(j!==Ie||oe!==Ge||ae!==ge)&&(i.stencilFunc(Ie,Ge,ge),j=Ie,oe=Ge,ae=ge)},setOp:function(Ie,Ge,ge){(le!==Ie||ye!==Ge||Ne!==ge)&&(i.stencilOp(Ie,Ge,ge),le=Ie,ye=Ge,Ne=ge)},setLocked:function(Ie){N=Ie},setClear:function(Ie){re!==Ie&&(i.clearStencil(Ie),re=Ie)},reset:function(){N=!1,K=null,j=null,oe=null,ae=null,le=null,ye=null,Ne=null,re=null}}}let r=new t,o=new n,a=new s,l={},c=new WeakMap,u={},p={},d={},h=new WeakMap,f=[],v=null,g=!1,m=null,_=null,E=null,y=null,w=null,T=null,x=null,b=new fe(0,0,0),F=0,D=!1,O=null,B=null,z=null,A=null,k=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,ee=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(Y)[1]),H=ee>=1):Y.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),H=ee>=2);let Q=null,ne={},_e=i.getParameter(i.SCISSOR_BOX),we=i.getParameter(i.VIEWPORT),ie=new lt().fromArray(_e),pe=new lt().fromArray(we);function Me(N,K,j,oe){let ae=new Uint8Array(4),le=i.createTexture();i.bindTexture(N,le),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ye=0;ye<j;ye++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(K+ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return le}let Pe={};Pe[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),Pe[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pe[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pe[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(i.DEPTH_TEST),o.setFunc(ms),It(!1),ot(Bl),he(i.CULL_FACE),ft(Hi);function he(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function Fe(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function yt(N,K){return d[N]!==K?(i.bindFramebuffer(N,K),d[N]=K,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=K),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=K),!0):!1}function Ae(N,K){let j=f,oe=!1;if(N){j=h.get(K),j===void 0&&(j=[],h.set(K,j));let ae=N.textures;if(j.length!==ae.length||j[0]!==i.COLOR_ATTACHMENT0){for(let le=0,ye=ae.length;le<ye;le++)j[le]=i.COLOR_ATTACHMENT0+le;j.length=ae.length,oe=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,oe=!0);oe&&i.drawBuffers(j)}function qe(N){return v!==N?(i.useProgram(N),v=N,!0):!1}let Qe={[Vi]:i.FUNC_ADD,[Cu]:i.FUNC_SUBTRACT,[Pu]:i.FUNC_REVERSE_SUBTRACT};Qe[Iu]=i.MIN,Qe[Lu]=i.MAX;let Be={[Du]:i.ZERO,[Nu]:i.ONE,[Fu]:i.SRC_COLOR,[Vl]:i.SRC_ALPHA,[Vu]:i.SRC_ALPHA_SATURATE,[zu]:i.DST_COLOR,[Ou]:i.DST_ALPHA,[Uu]:i.ONE_MINUS_SRC_COLOR,[Gl]:i.ONE_MINUS_SRC_ALPHA,[Hu]:i.ONE_MINUS_DST_COLOR,[Bu]:i.ONE_MINUS_DST_ALPHA,[Gu]:i.CONSTANT_COLOR,[ku]:i.ONE_MINUS_CONSTANT_COLOR,[Wu]:i.CONSTANT_ALPHA,[Xu]:i.ONE_MINUS_CONSTANT_ALPHA};function ft(N,K,j,oe,ae,le,ye,Ne,re,Ie){if(N===Hi){g===!0&&(Fe(i.BLEND),g=!1);return}if(g===!1&&(he(i.BLEND),g=!0),N!==Ru){if(N!==m||Ie!==D){if((_!==Vi||w!==Vi)&&(i.blendEquation(i.FUNC_ADD),_=Vi,w=Vi),Ie)switch(N){case As:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kn:i.blendFunc(i.ONE,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Oe("WebGLState: Invalid blending: ",N);break}else switch(N){case As:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zl:Oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hl:Oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Oe("WebGLState: Invalid blending: ",N);break}E=null,y=null,T=null,x=null,b.set(0,0,0),F=0,m=N,D=Ie}return}ae=ae||K,le=le||j,ye=ye||oe,(K!==_||ae!==w)&&(i.blendEquationSeparate(Qe[K],Qe[ae]),_=K,w=ae),(j!==E||oe!==y||le!==T||ye!==x)&&(i.blendFuncSeparate(Be[j],Be[oe],Be[le],Be[ye]),E=j,y=oe,T=le,x=ye),(Ne.equals(b)===!1||re!==F)&&(i.blendColor(Ne.r,Ne.g,Ne.b,re),b.copy(Ne),F=re),m=N,D=!1}function et(N,K){N.side===Gt?Fe(i.CULL_FACE):he(i.CULL_FACE);let j=N.side===Lt;K&&(j=!j),It(j),N.blending===As&&N.transparent===!1?ft(Hi):ft(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let oe=N.stencilWrite;a.setTest(oe),oe&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ct(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):Fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function It(N){O!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),O=N)}function ot(N){N!==Tu?(he(i.CULL_FACE),N!==B&&(N===Bl?i.cullFace(i.BACK):N===wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Fe(i.CULL_FACE),B=N}function ln(N){N!==z&&(H&&i.lineWidth(N),z=N)}function ct(N,K,j){N?(he(i.POLYGON_OFFSET_FILL),(A!==K||k!==j)&&(A=K,k=j,o.getReversed()&&(K=-K,j=-j),i.polygonOffset(K,j))):Fe(i.POLYGON_OFFSET_FILL)}function wt(N){N?he(i.SCISSOR_TEST):Fe(i.SCISSOR_TEST)}function Wt(N){N===void 0&&(N=i.TEXTURE0+V-1),Q!==N&&(i.activeTexture(N),Q=N)}function Rt(N,K,j){j===void 0&&(Q===null?j=i.TEXTURE0+V-1:j=Q);let oe=ne[j];oe===void 0&&(oe={type:void 0,texture:void 0},ne[j]=oe),(oe.type!==N||oe.texture!==K)&&(Q!==j&&(i.activeTexture(j),Q=j),i.bindTexture(N,K||Pe[N]),oe.type=N,oe.texture=K)}function X(){let N=ne[Q];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Mt(){try{i.compressedTexImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function nt(){try{i.compressedTexImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function it(){try{i.texSubImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function ce(){try{i.texSubImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function ut(){try{i.compressedTexSubImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function Re(){try{i.compressedTexSubImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function De(){try{i.texStorage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function L(){try{i.texStorage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function M(){try{i.texImage2D(...arguments)}catch(N){Oe("WebGLState:",N)}}function I(){try{i.texImage3D(...arguments)}catch(N){Oe("WebGLState:",N)}}function q(N){return p[N]!==void 0?p[N]:i.getParameter(N)}function R(N,K){p[N]!==K&&(i.pixelStorei(N,K),p[N]=K)}function Z(N){ie.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ie.copy(N))}function U(N){pe.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),pe.copy(N))}function C(N,K){let j=c.get(K);j===void 0&&(j=new WeakMap,c.set(K,j));let oe=j.get(N);oe===void 0&&(oe=i.getUniformBlockIndex(K,N.name),i.uniformBlockBinding(K,oe,oe),j.set(N,oe))}function W(N,K,j){let ae=c.get(K).get(N);l[ae]!==j&&(i.bindBufferBase(i.UNIFORM_BUFFER,ae,j),l[ae]=j)}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},Q=null,ne={},d={},l={},h=new WeakMap,f=[],v=null,g=!1,m=null,_=null,E=null,y=null,w=null,T=null,x=null,b=new fe(0,0,0),F=0,D=!1,O=null,B=null,z=null,A=null,k=null,ie.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:he,disable:Fe,bindFramebuffer:yt,drawBuffers:Ae,useProgram:qe,setBlending:ft,setMaterial:et,setFlipSided:It,setCullFace:ot,setLineWidth:ln,setPolygonOffset:ct,setScissorTest:wt,activeTexture:Wt,bindTexture:Rt,unbindTexture:X,compressedTexImage2D:Mt,compressedTexImage3D:nt,texImage2D:M,texImage3D:I,pixelStorei:R,getParameter:q,updateUBOMapping:C,uniformBlockBinding:W,texStorage2D:De,texStorage3D:L,texSubImage2D:it,texSubImage3D:ce,compressedTexSubImage2D:ut,compressedTexSubImage3D:Re,scissor:Z,viewport:U,reset:se}}function sx(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,u=new WeakMap,p=new Set,d,h=new WeakMap,f=new Set,v=new FinalizationRegistry(L=>f.delete(L)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(L,M){return g?new OffscreenCanvas(L,M):Qs("canvas")}function _(L,M,I){let q=1,R=De(L);if((R.width>I||R.height>I)&&(q=I/Math.max(R.width,R.height)),q<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let Z=Math.floor(q*R.width),U=Math.floor(q*R.height);d===void 0&&(d=m(Z,U));let C=M?m(Z,U):d;return C.width=Z,C.height=U,C.getContext("2d").drawImage(L,0,0,Z,U),Ue("WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Z+"x"+U+")."),C}else return"data"in L&&Ue("WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),L;return L}function E(L){return L.generateMipmaps}function y(L){i.generateMipmap(L)}function w(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(L,M,I,q,R,Z=!1){if(L!==null){if(i[L]!==void 0)return i[L];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let U;q&&(U=e.get("EXT_texture_norm16"),U||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let C=M;if(M===i.RED&&(I===i.FLOAT&&(C=i.R32F),I===i.HALF_FLOAT&&(C=i.R16F),I===i.UNSIGNED_BYTE&&(C=i.R8),I===i.UNSIGNED_SHORT&&U&&(C=U.R16_EXT),I===i.SHORT&&U&&(C=U.R16_SNORM_EXT)),M===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(C=i.R8UI),I===i.UNSIGNED_SHORT&&(C=i.R16UI),I===i.UNSIGNED_INT&&(C=i.R32UI),I===i.BYTE&&(C=i.R8I),I===i.SHORT&&(C=i.R16I),I===i.INT&&(C=i.R32I)),M===i.RG&&(I===i.FLOAT&&(C=i.RG32F),I===i.HALF_FLOAT&&(C=i.RG16F),I===i.UNSIGNED_BYTE&&(C=i.RG8),I===i.UNSIGNED_SHORT&&U&&(C=U.RG16_EXT),I===i.SHORT&&U&&(C=U.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(C=i.RG8UI),I===i.UNSIGNED_SHORT&&(C=i.RG16UI),I===i.UNSIGNED_INT&&(C=i.RG32UI),I===i.BYTE&&(C=i.RG8I),I===i.SHORT&&(C=i.RG16I),I===i.INT&&(C=i.RG32I)),M===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(C=i.RGB8UI),I===i.UNSIGNED_SHORT&&(C=i.RGB16UI),I===i.UNSIGNED_INT&&(C=i.RGB32UI),I===i.BYTE&&(C=i.RGB8I),I===i.SHORT&&(C=i.RGB16I),I===i.INT&&(C=i.RGB32I)),M===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(C=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(C=i.RGBA16UI),I===i.UNSIGNED_INT&&(C=i.RGBA32UI),I===i.BYTE&&(C=i.RGBA8I),I===i.SHORT&&(C=i.RGBA16I),I===i.INT&&(C=i.RGBA32I)),M===i.RGB&&(I===i.UNSIGNED_SHORT&&U&&(C=U.RGB16_EXT),I===i.SHORT&&U&&(C=U.RGB16_SNORM_EXT),I===i.UNSIGNED_INT_5_9_9_9_REV&&(C=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(C=i.R11F_G11F_B10F)),M===i.RGBA){let W=Z?js:$e.getTransfer(R);I===i.FLOAT&&(C=i.RGBA32F),I===i.HALF_FLOAT&&(C=i.RGBA16F),I===i.UNSIGNED_BYTE&&(C=W===rt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT&&U&&(C=U.RGBA16_EXT),I===i.SHORT&&U&&(C=U.RGBA16_SNORM_EXT),I===i.UNSIGNED_SHORT_4_4_4_4&&(C=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(C=i.RGB5_A1)}return(C===i.R16F||C===i.R32F||C===i.RG16F||C===i.RG32F||C===i.RGBA16F||C===i.RGBA32F)&&e.get("EXT_color_buffer_float"),C}function x(L,M){let I;return L?M===null||M===Nn||M===ki?I=i.DEPTH24_STENCIL8:M===wn?I=i.DEPTH32F_STENCIL8:M===Cs&&(I=i.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Nn||M===ki?I=i.DEPTH_COMPONENT24:M===wn?I=i.DEPTH_COMPONENT32F:M===Cs&&(I=i.DEPTH_COMPONENT16),I}function b(L,M){return E(L)===!0||L.isFramebufferTexture&&L.minFilter!==At&&L.minFilter!==bt?Math.log2(Math.max(M.width,M.height))+1:L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?M.mipmaps.length:1}function F(L){let M=new WeakRef(L);n.get(L).__ref=M,f.add(M),v.register(L,M,M)}function D(L){let M=n.get(L).__ref;M!==void 0&&(f.delete(M),v.unregister(M))}function O(L){z(L.target)}function B(L){A(L.target)}function z(L){L.removeEventListener("dispose",O),D(L),V(L),L.isVideoTexture&&u.delete(L),L.isHTMLTexture&&p.delete(L)}function A(L){L.removeEventListener("dispose",B),D(L),ee(L)}function k(){for(let L of f){let M=L.deref();M!==void 0&&(M.isRenderTarget===!0?A(M):z(M))}f.clear(),p.clear()}function V(L){let M=n.get(L);if(M.__webglInit===void 0)return;let I=L.source,q=h.get(I);if(q){let R=q[M.__cacheKey];R.usedTimes--,R.usedTimes===0&&H(L),Object.keys(q).length===0&&h.delete(I)}n.remove(L)}function H(L){let M=n.get(L);i.deleteTexture(M.__webglTexture);let I=L.source,q=h.get(I);delete q[M.__cacheKey],o.memory.textures--}function ee(L){let M=n.get(L);M.__depthDisposeCallback&&M.__depthDisposeCallback();let I=L.depthTexture;if(I&&I.renderTarget===L&&z(I),L.isWebGLCubeRenderTarget)for(let R=0;R<6;R++){if(Array.isArray(M.__webglFramebuffer[R]))for(let Z=0;Z<M.__webglFramebuffer[R].length;Z++)i.deleteFramebuffer(M.__webglFramebuffer[R][Z]);else i.deleteFramebuffer(M.__webglFramebuffer[R]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[R])}else{if(Array.isArray(M.__webglFramebuffer))for(let R=0;R<M.__webglFramebuffer.length;R++)i.deleteFramebuffer(M.__webglFramebuffer[R]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let R=0;R<M.__webglColorRenderbuffer.length;R++)M.__webglColorRenderbuffer[R]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[R]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let q=L.textures;for(let R=0,Z=q.length;R<Z;R++){let U=n.get(q[R]);U.__webglTexture&&(i.deleteTexture(U.__webglTexture),o.memory.textures--),n.remove(q[R])}n.remove(L)}let Y=0;function Q(){Y=0}function ne(){return Y}function _e(L){Y=L}function we(){let L=Y;return L>=s.maxTextures&&Ue("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),Y+=1,L}function ie(L){let M=[];return M.push(L.wrapS),M.push(L.wrapT),M.push(L.wrapR||0),M.push(L.magFilter),M.push(L.minFilter),M.push(L.anisotropy),M.push(L.internalFormat),M.push(L.format),M.push(L.type),M.push(L.generateMipmaps),M.push(L.mipmapsAutoUpdate),M.push(L.premultiplyAlpha),M.push(L.flipY),M.push(L.unpackAlignment),M.push(L.colorSpace),M.join()}function pe(L,M){let I=n.get(L);if(L.isVideoTexture&&ut(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&I.__version!==L.version){let q=L.image;if(q===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{et(I,L,M);return}}else L.isExternalTexture&&(I.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+M)}function Me(L,M){let I=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&I.__version!==L.version){et(I,L,M);return}else L.isExternalTexture&&(I.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+M)}function Pe(L,M){let I=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&I.__version!==L.version){et(I,L,M);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+M)}function he(L,M){let I=n.get(L);if(L.version>0&&I.__version!==L.version){It(I,L,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+M)}let Fe={[_o]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[yo]:i.MIRRORED_REPEAT},yt={[At]:i.NEAREST,[Zu]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[bt]:i.LINEAR,[ea]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},Ae={[ju]:i.NEVER,[rc]:i.ALWAYS,[Qu]:i.LESS,[ic]:i.LEQUAL,[eh]:i.EQUAL,[sc]:i.GEQUAL,[th]:i.GREATER,[nh]:i.NOTEQUAL};function qe(L,M){if(M.type===wn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===bt||M.magFilter===ea||M.magFilter===_r||M.magFilter===li||M.minFilter===bt||M.minFilter===ea||M.minFilter===_r||M.minFilter===li)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,Fe[M.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,Fe[M.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,Fe[M.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,yt[M.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,yt[M.minFilter]),M.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Ae[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===At||M.minFilter!==_r&&M.minFilter!==li||M.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Qe(L,M){let I=!1;L.__webglInit===void 0&&(L.__webglInit=!0,M.addEventListener("dispose",O),F(M));let q=M.source,R=h.get(q);R===void 0&&(R={},h.set(q,R));let Z=ie(M);if(Z!==L.__cacheKey){R[Z]===void 0&&(R[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,I=!0),R[Z].usedTimes++;let U=R[L.__cacheKey];U!==void 0&&(R[L.__cacheKey].usedTimes--,U.usedTimes===0&&H(M)),L.__cacheKey=Z,L.__webglTexture=R[Z].texture}return I}function Be(L,M,I){return Math.floor(Math.floor(L/I)/M)}function ft(L,M,I,q){let Z=L.updateRanges;if(Z.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,I,q,M.data);else{Z.sort((N,K)=>N.start-K.start);let U=0;for(let N=1;N<Z.length;N++){let K=Z[U],j=Z[N],oe=K.start+K.count,ae=Be(j.start,M.width,4),le=Be(K.start,M.width,4);j.start<=oe+1&&ae===le&&Be(j.start+j.count-1,M.width,4)===ae?K.count=Math.max(K.count,j.start+j.count-K.start):(++U,Z[U]=j)}Z.length=U+1;let C=t.getParameter(i.UNPACK_ROW_LENGTH),W=t.getParameter(i.UNPACK_SKIP_PIXELS),se=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let N=0,K=Z.length;N<K;N++){let j=Z[N],oe=Math.floor(j.start/4),ae=Math.ceil(j.count/4),le=oe%M.width,ye=Math.floor(oe/M.width),Ne=ae,re=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,le),t.pixelStorei(i.UNPACK_SKIP_ROWS,ye),t.texSubImage2D(i.TEXTURE_2D,0,le,ye,Ne,re,I,q,M.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,C),t.pixelStorei(i.UNPACK_SKIP_PIXELS,W),t.pixelStorei(i.UNPACK_SKIP_ROWS,se)}}function et(L,M,I){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);let R=Qe(L,M),Z=M.source;t.bindTexture(q,L.__webglTexture,i.TEXTURE0+I);let U=n.get(Z);if(Z.version!==U.__version||R===!0){if(t.activeTexture(i.TEXTURE0+I),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let re=$e.getPrimaries($e.workingColorSpace),Ie=M.colorSpace===Fn?null:$e.getPrimaries(M.colorSpace),Ge=M.colorSpace===Fn||re===Ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge)}t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let W=_(M.image,!1,s.maxTextureSize);W=Re(M,W);let se=r.convert(M.format,M.colorSpace),N=r.convert(M.type),K=T(M.internalFormat,se,N,M.normalized,M.colorSpace,M.isVideoTexture);qe(q,M);let j,oe=M.mipmaps,ae=M.isVideoTexture!==!0,le=U.__version===void 0||R===!0,ye=Z.dataReady,Ne=b(M,W);if(M.isDepthTexture)K=x(M.format===ci,M.type),le&&(ae?t.texStorage2D(i.TEXTURE_2D,1,K,W.width,W.height):t.texImage2D(i.TEXTURE_2D,0,K,W.width,W.height,0,se,N,null));else if(M.isDataTexture)if(oe.length>0){ae&&le&&t.texStorage2D(i.TEXTURE_2D,Ne,K,oe[0].width,oe[0].height);for(let re=0,Ie=oe.length;re<Ie;re++)j=oe[re],ae?ye&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,j.width,j.height,se,N,j.data):t.texImage2D(i.TEXTURE_2D,re,K,j.width,j.height,0,se,N,j.data);M.generateMipmaps=!1}else ae?(le&&t.texStorage2D(i.TEXTURE_2D,Ne,K,W.width,W.height),ye&&ft(M,W,se,N)):t.texImage2D(i.TEXTURE_2D,0,K,W.width,W.height,0,se,N,W.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ae&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ne,K,oe[0].width,oe[0].height,W.depth);for(let re=0,Ie=oe.length;re<Ie;re++)if(j=oe[re],M.format!==vn)if(se!==null)if(ae){if(ye)if(M.layerUpdates.size>0){let Ge=dc(j.width,j.height,M.format,M.type);for(let ge of M.layerUpdates){let at=j.data.subarray(ge*Ge/j.data.BYTES_PER_ELEMENT,(ge+1)*Ge/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,ge,j.width,j.height,1,se,at)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,j.width,j.height,W.depth,se,j.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,K,j.width,j.height,W.depth,0,j.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?ye&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,j.width,j.height,W.depth,se,N,j.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,K,j.width,j.height,W.depth,0,se,N,j.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{ae&&le&&t.texStorage2D(i.TEXTURE_2D,Ne,K,oe[0].width,oe[0].height);for(let re=0,Ie=oe.length;re<Ie;re++)j=oe[re],M.format!==vn?se!==null?ae?ye&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,j.width,j.height,se,j.data):t.compressedTexImage2D(i.TEXTURE_2D,re,K,j.width,j.height,0,j.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?ye&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,j.width,j.height,se,N,j.data):t.texImage2D(i.TEXTURE_2D,re,K,j.width,j.height,0,se,N,j.data)}else if(M.isDataArrayTexture)if(ae){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ne,K,W.width,W.height,W.depth),ye)if(M.layerUpdates.size>0){let re=dc(W.width,W.height,M.format,M.type);for(let Ie of M.layerUpdates){let Ge=W.data.subarray(Ie*re/W.data.BYTES_PER_ELEMENT,(Ie+1)*re/W.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ie,W.width,W.height,1,se,N,Ge)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,se,N,W.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,K,W.width,W.height,W.depth,0,se,N,W.data);else if(M.isData3DTexture)ae?(le&&t.texStorage3D(i.TEXTURE_3D,Ne,K,W.width,W.height,W.depth),ye&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,se,N,W.data)):t.texImage3D(i.TEXTURE_3D,0,K,W.width,W.height,W.depth,0,se,N,W.data);else if(M.isFramebufferTexture){if(le)if(ae)t.texStorage2D(i.TEXTURE_2D,Ne,K,W.width,W.height);else{let re=W.width,Ie=W.height;for(let Ge=0;Ge<Ne;Ge++)t.texImage2D(i.TEXTURE_2D,Ge,K,re,Ie,0,se,N,null),re>>=1,Ie>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){let re=i.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),W.parentNode!==re){re.appendChild(W),p.add(M),re.onpaint=Ie=>{let Ge=Ie.changedElements;for(let ge of p)Ge.includes(ge.image)&&(ge.needsUpdate=!0)},re.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,W);else{let Ge=i.RGBA,ge=i.RGBA,at=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ge,ge,at,W)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(oe.length>0){if(ae&&le){let re=De(oe[0]);t.texStorage2D(i.TEXTURE_2D,Ne,K,re.width,re.height)}for(let re=0,Ie=oe.length;re<Ie;re++)j=oe[re],ae?ye&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,se,N,j):t.texImage2D(i.TEXTURE_2D,re,K,se,N,j);M.generateMipmaps=!1}else if(ae){if(le){let re=De(W);t.texStorage2D(i.TEXTURE_2D,Ne,K,re.width,re.height)}ye&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,N,W)}else t.texImage2D(i.TEXTURE_2D,0,K,se,N,W);E(M)&&M.mipmapsAutoUpdate===!0&&y(q),U.__version=Z.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function It(L,M,I){if(M.image.length!==6)return;let q=Qe(L,M),R=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+I);let Z=n.get(R);if(R.version!==Z.__version||q===!0){t.activeTexture(i.TEXTURE0+I);let U=$e.getPrimaries($e.workingColorSpace),C=M.colorSpace===Fn?null:$e.getPrimaries(M.colorSpace),W=M.colorSpace===Fn||U===C?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);let se=M.isCompressedTexture||M.image[0].isCompressedTexture,N=M.image[0]&&M.image[0].isDataTexture,K=[];for(let ge=0;ge<6;ge++)!se&&!N?K[ge]=_(M.image[ge],!0,s.maxCubemapSize):K[ge]=N?M.image[ge].image:M.image[ge],K[ge]=Re(M,K[ge]);let j=K[0],oe=r.convert(M.format,M.colorSpace),ae=r.convert(M.type),le=T(M.internalFormat,oe,ae,M.normalized,M.colorSpace),ye=M.isVideoTexture!==!0,Ne=Z.__version===void 0||q===!0,re=R.dataReady,Ie=b(M,j);qe(i.TEXTURE_CUBE_MAP,M);let Ge;if(M.isDepthTexture){if(le=x(M.format===ci,M.type),Ne)if(ye)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,le,j.width,j.height);else for(let ge=0;ge<6;ge++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,le,j.width,j.height,0,oe,ae,null)}else if(se){ye&&Ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ie,le,j.width,j.height);for(let ge=0;ge<6;ge++){Ge=K[ge].mipmaps;for(let at=0;at<Ge.length;at++){let Ot=Ge[at];M.format!==vn?oe!==null?ye?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at,0,0,Ot.width,Ot.height,oe,Ot.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at,le,Ot.width,Ot.height,0,Ot.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ye?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at,0,0,Ot.width,Ot.height,oe,ae,Ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at,le,Ot.width,Ot.height,0,oe,ae,Ot.data)}}}else{if(Ge=M.mipmaps,ye&&Ne){Ge.length>0&&Ie++;let ge=De(K[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ie,le,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(N){ye?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,K[ge].width,K[ge].height,oe,ae,K[ge].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,le,K[ge].width,K[ge].height,0,oe,ae,K[ge].data);for(let at=0;at<Ge.length;at++){let di=Ge[at].image[ge].image;ye?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at+1,0,0,di.width,di.height,oe,ae,di.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at+1,le,di.width,di.height,0,oe,ae,di.data)}}else{ye?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,oe,ae,K[ge]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,le,oe,ae,K[ge]);for(let at=0;at<Ge.length;at++){let Ot=Ge[at];ye?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at+1,0,0,oe,ae,Ot.image[ge]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,at+1,le,oe,ae,Ot.image[ge])}}}E(M)&&M.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),Z.__version=R.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function ot(L,M,I,q,R,Z){let U=r.convert(I.format,I.colorSpace),C=r.convert(I.type),W=T(I.internalFormat,U,C,I.normalized,I.colorSpace),se=n.get(M),N=n.get(I);if(N.__renderTarget=M,!se.__hasExternalTextures){let K=Math.max(1,M.width>>Z),j=Math.max(1,M.height>>Z);R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?t.texImage3D(R,Z,W,K,j,M.depth,0,U,C,null):t.texImage2D(R,Z,W,K,j,0,U,C,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),ce(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,R,N.__webglTexture,0,it(M)):(R===i.TEXTURE_2D||R>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&R<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,R,N.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ln(L,M,I){if(i.bindRenderbuffer(i.RENDERBUFFER,L),M.depthBuffer){let q=M.depthTexture,R=q&&q.isDepthTexture?q.type:null,Z=x(M.stencilBuffer,R),U=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ce(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it(M),Z,M.width,M.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,it(M),Z,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Z,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,L)}else{let q=M.textures;for(let R=0;R<q.length;R++){let Z=q[R],U=r.convert(Z.format,Z.colorSpace),C=r.convert(Z.type),W=T(Z.internalFormat,U,C,Z.normalized,Z.colorSpace);ce(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it(M),W,M.width,M.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,it(M),W,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,W,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ct(L,M,I){let q=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let R=n.get(M.depthTexture);R.__renderTarget=M;let Z=q?M.depthTexture.image[0]:M.depthTexture.image;(!R.__webglTexture||Z.width!==M.width||Z.height!==M.height)&&(Z.width=M.width,Z.height=M.height,M.depthTexture.needsUpdate=!0),q?he(M.depthTexture,0):pe(M.depthTexture,0);let U=R.__webglTexture,C=it(M),W=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,se=M.depthTexture.format===ci?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===ii)ce(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,W,U,0,C):i.framebufferTexture2D(i.FRAMEBUFFER,se,W,U,0);else if(M.depthTexture.format===ci)ce(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,W,U,0,C):i.framebufferTexture2D(i.FRAMEBUFFER,se,W,U,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function wt(L){let M=n.get(L),I=L.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==L.depthTexture){let q=L.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){let R=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",R)};q.addEventListener("dispose",R),M.__depthDisposeCallback=R}M.__boundDepthTexture=q}if(L.depthTexture&&!M.__autoAllocateDepthBuffer)if(I)for(let q=0;q<6;q++)ct(M.__webglFramebuffer[q],L,q);else L.texture.mipmaps.length>0?ct(M.__webglFramebuffer[0],L,0):ct(M.__webglFramebuffer,L,0);else if(I){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),ln(M.__webglDepthbuffer[q],L,!1);else{let R=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,R,i.RENDERBUFFER,Z)}}else if(L.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ln(M.__webglDepthbuffer,L,!1);else{let R=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,R,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Wt(L,M,I){let q=n.get(L);M!==void 0&&ot(q.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&wt(L)}function Rt(L){let M=L.texture,I=n.get(L),q=n.get(M);L.addEventListener("dispose",B),F(L);let R=L.textures,Z=L.isWebGLCubeRenderTarget===!0,U=R.length>1;if(U||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,o.memory.textures++),Z){I.__webglFramebuffer=[];for(let C=0;C<6;C++)if(M.mipmaps.length>0){I.__webglFramebuffer[C]=[];for(let W=0;W<M.mipmaps.length;W++)I.__webglFramebuffer[C][W]=i.createFramebuffer()}else I.__webglFramebuffer[C]=i.createFramebuffer()}else{if(M.mipmaps.length>0){I.__webglFramebuffer=[];for(let C=0;C<M.mipmaps.length;C++)I.__webglFramebuffer[C]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(U)for(let C=0,W=R.length;C<W;C++){let se=n.get(R[C]);se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&ce(L)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let C=0;C<R.length;C++){let W=R[C];I.__webglColorRenderbuffer[C]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[C]);let se=r.convert(W.format,W.colorSpace),N=r.convert(W.type),K=T(W.internalFormat,se,N,W.normalized,W.colorSpace,L.isXRRenderTarget===!0),j=it(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,K,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+C,i.RENDERBUFFER,I.__webglColorRenderbuffer[C])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),ln(I.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),qe(i.TEXTURE_CUBE_MAP,M);for(let C=0;C<6;C++)if(M.mipmaps.length>0)for(let W=0;W<M.mipmaps.length;W++)ot(I.__webglFramebuffer[C][W],L,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+C,W);else ot(I.__webglFramebuffer[C],L,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+C,0);E(M)?y(i.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}else if(U){for(let C=0,W=R.length;C<W;C++){let se=R[C],N=n.get(se),K=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(K=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,N.__webglTexture),qe(K,se),ot(I.__webglFramebuffer,L,se,i.COLOR_ATTACHMENT0+C,K,0),E(se)&&y(K)}t.unbindTexture()}else{let C=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(C=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(C,q.__webglTexture),qe(C,M),M.mipmaps.length>0)for(let W=0;W<M.mipmaps.length;W++)ot(I.__webglFramebuffer[W],L,M,i.COLOR_ATTACHMENT0,C,W);else ot(I.__webglFramebuffer,L,M,i.COLOR_ATTACHMENT0,C,0);E(M)?y(C):M.mipmaps.length>0&&i.texParameteri(C,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}L.depthBuffer&&wt(L)}function X(L){let M=L.textures;for(let I=0,q=M.length;I<q;I++){let R=M[I];if(E(R)&&R.mipmapsAutoUpdate===!0){let Z=w(L),U=n.get(R).__webglTexture;t.bindTexture(Z,U),y(Z),t.unbindTexture()}}}let Mt=[];function nt(L){if(L.samples>0){if(ce(L)===!1){let M=L.textures,I=L.width,q=L.height,R=i.COLOR_BUFFER_BIT,Z=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,U=n.get(L),C=M.length>1;if(C)for(let se=0;se<M.length;se++)t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,U.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,U.__webglMultisampledFramebuffer),L.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglFramebuffer);for(let se=0;se<M.length;se++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(R|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(R|=i.STENCIL_BUFFER_BIT)),C){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,U.__webglColorRenderbuffer[se]);let N=n.get(M[se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,N,0)}i.blitFramebuffer(0,0,I,q,0,0,I,q,R,i.NEAREST),l===!0&&(Mt.length=0,Mt.push(i.COLOR_ATTACHMENT0+se),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&Mt.push(Z),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),C)for(let se=0;se<M.length;se++){t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,U.__webglColorRenderbuffer[se]);let N=n.get(M[se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,U.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,N,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,U.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&l){let M=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function it(L){return Math.min(s.maxSamples,L.samples)}function ce(L){let M=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ut(L){let M=o.render.frame;u.get(L)!==M&&(u.set(L,M),L.update())}function Re(L,M){let I=L.colorSpace,q=L.format,R=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||I!==Ks&&I!==Fn&&($e.getTransfer(I)===rt?(q!==vn||R!==dn)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Oe("WebGLTextures: Unsupported texture color space:",I)),M}function De(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=we,this.resetTextureUnits=Q,this.getTextureUnits=ne,this.setTextureUnits=_e,this.setTexture2D=pe,this.setTexture2DArray=Me,this.setTexture3D=Pe,this.setTextureCube=he,this.rebindTextures=Wt,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=ce,this.dispose=k}function rx(i,e){function t(n,s=Fn){let r,o=$e.getTransfer(s);if(n===dn)return i.UNSIGNED_BYTE;if(n===na)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ql)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ec)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kl)return i.BYTE;if(n===jl)return i.SHORT;if(n===Cs)return i.UNSIGNED_SHORT;if(n===ta)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Jt)return i.HALF_FLOAT;if(n===tc)return i.ALPHA;if(n===nc)return i.RGB;if(n===vn)return i.RGBA;if(n===ii)return i.DEPTH_COMPONENT;if(n===ci)return i.DEPTH_STENCIL;if(n===sa)return i.RED;if(n===ra)return i.RED_INTEGER;if(n===Ri)return i.RG;if(n===oa)return i.RG_INTEGER;if(n===aa)return i.RGBA_INTEGER;if(n===yr||n===Mr||n===br||n===Sr)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===la||n===ca||n===ua||n===ha)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===la)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===da||n===fa||n===pa||n===ma||n===ga||n===Er||n===xa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===da||n===fa)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ma)return r.COMPRESSED_R11_EAC;if(n===ga)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Er)return r.COMPRESSED_RG11_EAC;if(n===xa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===va||n===_a||n===ya||n===Ma||n===ba||n===Sa||n===Ea||n===Ta||n===wa||n===Aa||n===Ra||n===Ca||n===Pa||n===Ia)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===va)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_a)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ya)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ma)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Sa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ea)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ta)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ra)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ca)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ia)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===Da||n===Na)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===La)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fa||n===Ua||n===Tr||n===Oa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ax=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new lr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new mt({vertexShader:ox,fragmentShader:ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new We(new Tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ac=class extends Bn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,p=null,d=null,h=null,f=null,v=typeof XRWebGLBinding<"u",g=new wc,m={},_=t.getContextAttributes(),E=null,y=null,w=[],T=[],x=new ue,b=null,F=null,D=new qt;D.viewport=new lt;let O=new qt;O.viewport=new lt;let B=[D,O],z=new $o,A=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let pe=w[ie];return pe===void 0&&(pe=new ys,w[ie]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(ie){let pe=w[ie];return pe===void 0&&(pe=new ys,w[ie]=pe),pe.getGripSpace()},this.getHand=function(ie){let pe=w[ie];return pe===void 0&&(pe=new ys,w[ie]=pe),pe.getHandSpace()};function V(ie){let pe=T.indexOf(ie.inputSource);if(pe===-1)return;let Me=w[pe];Me!==void 0&&(Me.update(ie.inputSource,ie.frame,c||o),Me.dispatchEvent({type:ie.type,data:ie.inputSource}))}function H(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",ee);for(let ie=0;ie<w.length;ie++){let pe=T[ie];pe!==null&&(T[ie]=null,w[ie].disconnect(pe))}A=null,k=null,g.reset();for(let ie in m)delete m[ie];if(e.setRenderTarget(E),h=null,d=null,p=null,s=null,y=null,we.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(x.width,x.height,!1),F!==null){let ie=F.camera;ie.fov=F.fov,ie.zoom=F.zoom,ie.updateProjectionMatrix(),F=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){a=ie,n.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return p===null&&v&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",H),s.addEventListener("inputsourceschange",ee),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(x),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Pe=null,he=null;_.depth&&(he=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=_.stencil?ci:ii,Pe=_.stencil?ki:Nn);let Fe={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};p=this.getBinding(),d=p.createProjectionLayer(Fe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Zt(d.textureWidth,d.textureHeight,{format:vn,type:dn,depthTexture:new Ln(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Me={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new Zt(h.framebufferWidth,h.framebufferHeight,{format:vn,type:dn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),we.setContext(s),we.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ee(ie){for(let pe=0;pe<ie.removed.length;pe++){let Me=ie.removed[pe],Pe=T.indexOf(Me);Pe>=0&&(T[Pe]=null,w[Pe].disconnect(Me))}for(let pe=0;pe<ie.added.length;pe++){let Me=ie.added[pe],Pe=T.indexOf(Me);if(Pe===-1){for(let Fe=0;Fe<w.length;Fe++)if(Fe>=T.length){T.push(Me),Pe=Fe;break}else if(T[Fe]===null){T[Fe]=Me,Pe=Fe;break}if(Pe===-1)break}let he=w[Pe];he&&he.connect(Me)}}function Y(ie,pe){pe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(pe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let pe=ie.near,Me=ie.far;g.texture!==null&&(g.depthNear>0&&(pe=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),z.near=O.near=D.near=pe,z.far=O.far=D.far=Me,(A!==z.near||k!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),A=z.near,k=z.far),z.layers.mask=ie.layers.mask|6,D.layers.mask=z.layers.mask&-5,O.layers.mask=z.layers.mask&-3;let Pe=ie.parent,he=z.cameras;Y(z,Pe);for(let Fe=0;Fe<he.length;Fe++)Y(he[Fe],Pe);z.projectionMatrix.copy(D.projectionMatrix),z.projectionMatrixInverse.copy(D.projectionMatrixInverse),F===null&&ie.isPerspectiveCamera&&(F={camera:ie,fov:ie.fov,zoom:ie.zoom}),Q(ie,z,Pe)};function Q(ie,pe,Me){Me===null?ie.matrix.copy(pe.matrixWorld):(ie.matrix.copy(Me.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(pe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(pe.projectionMatrix),ie.projectionMatrixInverse.copy(pe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=bo*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ie)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(z)},this.getCameraTexture=function(ie){return m[ie]};let ne=null;function _e(ie,pe){if(u=pe.getViewerPose(c||o),f=pe,u!==null){let Me=u.views;h!==null&&(e.setRenderTargetFramebuffer(y,h.framebuffer),e.setRenderTarget(y));let Pe=!1;Me.length!==z.cameras.length&&(z.cameras.length=0,Pe=!0);for(let Ae=0;Ae<Me.length;Ae++){let qe=Me[Ae],Qe=null;if(h!==null)Qe=h.getViewport(qe);else{let ft=p.getViewSubImage(d,qe);Qe=ft.viewport,Ae===0&&(e.setRenderTargetTextures(y,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(y))}let Be=B[Ae];Be===void 0&&(Be=new qt,Be.layers.enable(Ae),Be.viewport=new lt,B[Ae]=Be),Be.matrix.fromArray(qe.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(qe.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Ae===0&&(z.matrix.copy(Be.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Pe===!0&&z.cameras.push(Be)}let he=s.enabledFeatures;if(he&&he.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){p=n.getBinding();let Ae=p.getDepthInformation(Me[0]);Ae&&Ae.isValid&&Ae.texture&&g.init(Ae,s.renderState)}if(he&&he.includes("camera-access")&&v){e.state.unbindTexture(),p=n.getBinding();for(let Ae=0;Ae<Me.length;Ae++){let qe=Me[Ae].camera;if(qe){let Qe=m[qe];Qe||(Qe=new lr,m[qe]=Qe);let Be=p.getCameraImage(qe);Qe.sourceTexture=Be}}}}for(let Me=0;Me<w.length;Me++){let Pe=T[Me],he=w[Me];Pe!==null&&he!==void 0&&he.update(Pe,pe,c||o)}ne&&ne(ie,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),f=null}let we=new Fh;we.setAnimationLoop(_e),this.setAnimationLoop=function(ie){ne=ie},this.dispose=function(){}}},lx=new ke,Xh=new ze;Xh.set(-1,0,0,0,1,0,0,0,1);function cx(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,cc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,_,E,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),p(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&h(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),f(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,_,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Lt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Lt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let _=e.get(m),E=_.envMap,y=_.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(lx.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Xh),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function p(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function h(g,m,_){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Lt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ux(i,e,t,n){let s={},r={};function o(_,E){let y=E.program;n.uniformBlockBinding(_,y,s[_.id])}function a(_,E){let y=s[_.id];y===void 0&&(f(_),y=l(_),s[_.id]=y,_.addEventListener("dispose",g));let w=E.program;n.updateUBOMapping(_,w);let T=e.render.frame;r[_.id]!==T&&(c(_),r[_.id]=T)}function l(_){let E=i.createBuffer(),y=_.__size,w=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,y,w),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(_){let E=s[_.id],y=_.uniforms,w=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,x=y.length;T<x;T++){let b=y[T];if(Array.isArray(b))for(let F=0,D=b.length;F<D;F++)u(b[F],T,F,w);else u(b,T,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(_,E,y,w){if(d(_,E,y,w)===!0){let T=_.__offset,x=_.value;if(Array.isArray(x)){let b=0;for(let F=0;F<x.length;F++){let D=x[F],O=v(D,!0);p(D,_.__data,b),b+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else p(x,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,_.__data)}}function p(_,E,y){typeof _=="number"||typeof _=="boolean"?E[y]=_:_.isMatrix3?(E[y]=_.elements[0],E[y+1]=_.elements[1],E[y+2]=_.elements[2],E[y+3]=0,E[y+4]=_.elements[3],E[y+5]=_.elements[4],E[y+6]=_.elements[5],E[y+7]=0,E[y+8]=_.elements[6],E[y+9]=_.elements[7],E[y+10]=_.elements[8],E[y+11]=0):ArrayBuffer.isView(_)?E.set(_.subarray(0,E.length-y),y):_.toArray(E,y)}function d(_,E,y,w){let T=_.value,x=E+"_"+y;if(Array.isArray(T)){w[x]===void 0&&(w[x]=[]);let b=w[x],F=!1;for(let D=0;D<T.length;D++)h(T[D],b,D)===!0&&(F=!0);return F}return h(T,w,x)}function h(_,E,y){if(E[y]===void 0)return typeof _=="number"||typeof _=="boolean"?E[y]=_:ArrayBuffer.isView(_)?E[y]=_.slice():E[y]=_.clone(),!0;{let w=E[y];if(typeof _=="number"||typeof _=="boolean"){if(w!==_)return E[y]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(w.equals(_)===!1)return w.copy(_),!0}}return!1}function f(_){let E=_.uniforms,y=0,w=16;for(let x=0,b=E.length;x<b;x++){let F=Array.isArray(E[x])?E[x]:[E[x]];for(let D=0,O=F.length;D<O;D++){let B=F[D],z=Array.isArray(B.value)?B.value:[B.value],A=Array.isArray(E[x])||Array.isArray(B.value),k=y;for(let H=0,ee=z.length;H<ee;H++){let Y=z[H],Q=v(Y,A),ne=y%w,_e=ne%Q.boundary,we=ne+_e;y+=_e,we!==0&&w-we<Q.storage&&(y+=w-we),H===0&&(k=y),y+=Q.storage}let V=B.type==="int"?Int32Array:B.type==="uint"?Uint32Array:Float32Array;B.__data=new V((y-k)/Float32Array.BYTES_PER_ELEMENT),B.__offset=k}}let T=y%w;return T>0&&(y+=w-T),_.__size=y,_.__cache={},this}function v(_,E){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=16,y.storage=48):_.isMatrix4?(y.boundary=16,y.storage=64):_.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(y.boundary=16,y.storage=_.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",_),E===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function g(_){let E=_.target;E.removeEventListener("dispose",g),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:o,update:a,dispose:m}}var hx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Xn=null;function dx(){return Xn===null&&(Xn=new Oi(hx,16,16,Ri,Jt),Xn.name="DFG_LUT",Xn.minFilter=bt,Xn.magFilter=bt,Xn.wrapS=Mn,Xn.wrapT=Mn,Xn.generateMipmaps=!1,Xn.needsUpdate=!0),Xn}var Xa=class{constructor(e={}){let{canvas:t=ih(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:d=!1,outputBufferType:h=dn}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let v=h,g=new Set([aa,oa,ra]),m=new Set([dn,Nn,Cs,ki,na,ia]),_=new Uint32Array(4),E=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},w=null,T=null,x=[],b=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,B=null,z=null,A=null,k=null;this._outputColorSpace=Et;let V=0,H=0,ee=null,Y=-1,Q=null,ne=new lt,_e=new lt,we=null,ie=new fe(0),pe=0,Me=t.width,Pe=t.height,he=1,Fe=null,yt=null,Ae=new lt(0,0,Me,Pe),qe=new lt(0,0,Me,Pe),Qe=!1,Be=new bi,ft=new Ao,et=!1,It=!1,ot=new ke,ln=new P,ct=new lt,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function Rt(){return ee===null?he:1}let X=n;function Mt(S,G){return t.getContext(S,G)}let nt,it,ce,ut,Re,De,L,M,I,q,R,Z,U,C,W,se,N,K,j,oe,ae,le,ye;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ie,!1),t.addEventListener("webglcontextrestored",Ge,!1),t.addEventListener("webglcontextcreationerror",ge,!1),X===null){let G="webgl2";if(X=Mt(G,S),X===null)throw Mt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(S){throw t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Oe("WebGLRenderer: "+S.message),S}function Ne(){nt=new S0(X),nt.init(),ae=new rx(X,nt),it=new d0(X,nt,e,ae),ce=new ix(X,nt),it.reversedDepthBuffer&&d&&ce.buffers.depth.setReversed(!0),z=X.createFramebuffer(),A=X.createFramebuffer(),k=X.createFramebuffer(),ut=new w0(X),Re=new kg,De=new sx(X,nt,ce,Re,it,ae,ut),L=new b0(D),M=new Rf(X),le=new u0(X,M),I=new E0(X,M,ut,le),q=new R0(X,I,M,le,ut),K=new A0(X,it,De),W=new f0(Re),R=new Gg(D,L,nt,it,le,W),Z=new cx(D,Re),U=new Xg,C=new Kg(nt),N=new c0(D,L,ce,q,f,l),se=new nx(D,q,it),ye=new ux(X,ut,it,ce),j=new h0(X,nt,ut),oe=new T0(X,nt,ut),ut.programs=R.programs,D.capabilities=it,D.extensions=nt,D.properties=Re,D.renderLists=U,D.shadowMap=se,D.state=ce,D.info=ut}v!==dn&&(F=new P0(v,t.width,t.height,a,s,r));let re=new Ac(D,X);this.xr=re,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let S=nt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=nt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(S){S!==void 0&&(he=S,this.setSize(Me,Pe,!1))},this.getSize=function(S){return S.set(Me,Pe)},this.setSize=function(S,G,te=!0){if(re.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}Me=S,Pe=G,t.width=Math.floor(S*he),t.height=Math.floor(G*he),te===!0&&(t.style.width=S+"px",t.style.height=G+"px"),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,S,G)},this.getDrawingBufferSize=function(S){return S.set(Me*he,Pe*he).floor()},this.setDrawingBufferSize=function(S,G,te){Me=S,Pe=G,he=te,t.width=Math.floor(S*te),t.height=Math.floor(G*te),this.setViewport(0,0,S,G)},this.setEffects=function(S){if(v===dn){Oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let G=0;G<S.length;G++)if(S[G].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ne)},this.getViewport=function(S){return S.copy(Ae)},this.setViewport=function(S,G,te,J){S.isVector4?Ae.set(S.x,S.y,S.z,S.w):Ae.set(S,G,te,J),ce.viewport(ne.copy(Ae).multiplyScalar(Rt()).round())},this.getScissor=function(S){return S.copy(qe)},this.setScissor=function(S,G,te,J){S.isVector4?qe.set(S.x,S.y,S.z,S.w):qe.set(S,G,te,J),ce.scissor(_e.copy(qe).multiplyScalar(Rt()).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(S){ce.setScissorTest(Qe=S)},this.setOpaqueSort=function(S){Fe=S},this.setTransparentSort=function(S){yt=S},this.getClearColor=function(S){return S.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(S=!0,G=!0,te=!0){let J=0;if(S){let $=!1;if(ee!==null){let me=ee.texture.format;$=g.has(me)}if($){let me=ee.texture.type,Se=m.has(me),de=N.getClearColor(),ve=N.getClearAlpha(),Ce=de.r,He=de.g,Ze=de.b;Se?(_[0]=Ce,_[1]=He,_[2]=Ze,_[3]=ve,X.clearBufferuiv(X.COLOR,0,_)):(E[0]=Ce,E[1]=He,E[2]=Ze,E[3]=ve,X.clearBufferiv(X.COLOR,0,E))}else J|=X.COLOR_BUFFER_BIT}G&&(J|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&(J|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&X.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),B=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),N.dispose(),U.dispose(),C.dispose(),De.dispose(),Re.dispose(),L.dispose(),q.dispose(),I.dispose(),le.dispose(),ye.dispose(),R.dispose(),re.dispose(),re.removeEventListener("sessionstart",Nc),re.removeEventListener("sessionend",Fc),Ci.stop()};function Ie(S){S.preventDefault(),er("WebGLRenderer: Context Lost."),O=!0}function Ge(){er("WebGLRenderer: Context Restored."),O=!1;let S=ut.autoReset,G=se.enabled,te=se.autoUpdate,J=se.needsUpdate,$=se.type;Ne(),ut.autoReset=S,se.enabled=G,se.autoUpdate=te,se.needsUpdate=J,se.type=$}function ge(S){Oe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function at(S){let G=S.target;G.removeEventListener("dispose",at),Ot(G)}function Ot(S){di(S),Re.remove(S)}function di(S){let G=Re.get(S).programs;G!==void 0&&(G.forEach(function(te){R.releaseProgram(te)}),S.isShaderMaterial&&R.releaseShaderCache(S))}this.renderBufferDirect=function(S,G,te,J,$,me){G===null&&(G=wt);let Se=$.isMesh&&$.matrixWorld.determinantAffine()<0,de=Pd(S,G,te,J,$);ce.setMaterial(J,Se);let ve=te.index,Ce=1;if(J.wireframe===!0){if(ve=I.getWireframeAttribute(te),ve===void 0)return;Ce=2}let He=te.drawRange,Ze=te.attributes.position,Ee=He.start*Ce,Je=(He.start+He.count)*Ce;me!==null&&(Ee=Math.max(Ee,me.start*Ce),Je=Math.min(Je,(me.start+me.count)*Ce)),ve!==null?(Ee=Math.max(Ee,0),Je=Math.min(Je,ve.count)):Ze!=null&&(Ee=Math.max(Ee,0),Je=Math.min(Je,Ze.count));let Ct=Je-Ee;if(Ct<0||Ct===1/0)return;le.setup($,J,de,te,ve);let pt,ht=j;if(ve!==null&&(pt=M.get(ve),ht=oe,ht.setIndex(pt)),$.isMesh)J.wireframe===!0?(ce.setLineWidth(J.wireframeLinewidth*Rt()),ht.setMode(X.LINES)):ht.setMode(X.TRIANGLES);else if($.isLine){let Kt=J.linewidth;Kt===void 0&&(Kt=1),ce.setLineWidth(Kt*Rt()),$.isLineSegments?ht.setMode(X.LINES):$.isLineLoop?ht.setMode(X.LINE_LOOP):ht.setMode(X.LINE_STRIP)}else $.isPoints?ht.setMode(X.POINTS):$.isSprite&&ht.setMode(X.TRIANGLES);if($.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ht.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Kt=$._multiDrawStarts,Te=$._multiDrawCounts,cn=$._multiDrawCount,st=ve?M.get(ve).bytesPerElement:1,Pi=Re.get(J).currentProgram.getUniforms();for(let jt=0;jt<cn;jt++)Pi.setValue(X,"_gl_DrawID",jt),ht.render(Kt[jt]/st,Te[jt])}else if($.isInstancedMesh)ht.renderInstances(Ee,Ct,$.count);else if(te.isInstancedBufferGeometry){let Kt=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Te=Math.min(te.instanceCount,Kt);ht.renderInstances(Ee,Ct,Te)}else ht.render(Ee,Ct)};function Dc(S,G,te,J){B!==null&&S.isNodeMaterial&&B.setObject(J,S),et===!0&&W.setState(S,te,!1),S.transparent===!0&&S.side===Gt&&S.forceSinglePass===!1?(S.side=Lt,S.needsUpdate=!0,Os(S,G,J),S.side=Gn,S.needsUpdate=!0,Os(S,G,J),S.side=Gt):Os(S,G,J)}this.compile=function(S,G,te=null){te===null&&(te=S),B!==null&&B.renderStart(S,G,te),T=C.get(te),T.init(G),b.push(T),te.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),S!==te&&S.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),T.setupLights(),B!==null&&B.updateLights(T.state.lightsArray),It=this.localClippingEnabled,et=W.init(this.clippingPlanes,It),et===!0&&W.setGlobalState(this.clippingPlanes,G),B!==null&&se.render(T.state.shadowsArray,te,G);let J=new Set;return S.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let me=$.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){let de=me[Se];Dc(de,te,G,$),J.add(de)}else Dc(me,te,G,$),J.add(me)}),T=b.pop(),B!==null&&B.renderEnd(),J},this.compileAsync=function(S,G,te=null){let J=this.compile(S,G,te);return new Promise($=>{function me(){if(J.forEach(function(Se){let ve=Re.get(Se).currentProgram;(ve===void 0||ve.isReady())&&J.delete(Se)}),J.size===0){$(S);return}setTimeout(me,10)}nt.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let tl=null;function Rd(S){tl&&tl(S)}function Nc(){Ci.stop()}function Fc(){Ci.start()}let Ci=new Fh;Ci.setAnimationLoop(Rd),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(S){tl=S,re.setAnimationLoop(S),S===null?Ci.stop():Ci.start()},re.addEventListener("sessionstart",Nc),re.addEventListener("sessionend",Fc),this.render=function(S,G){if(G!==void 0&&G.isCamera!==!0){Oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;B!==null&&B.renderStart(S,G);let te=re.enabled===!0&&re.isPresenting===!0,J=F!==null&&(ee===null||te)&&F.begin(D,ee);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(re.cameraAutoUpdate===!0&&re.updateCamera(G),G=re.getCamera()),S.isScene===!0&&S.onBeforeRender(D,S,G,ee),T=C.get(S,b.length),T.init(G),T.state.textureUnits=De.getTextureUnits(),b.push(T),ot.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?ft.setFromArrayCamera(G):Be.setFromProjectionMatrix(ot,bn,G.reversedDepth),It=this.localClippingEnabled,et=W.init(this.clippingPlanes,It),w=U.get(S,x.length),w.init(),x.push(w),this.info.render.frame++,re.enabled===!0&&re.isPresenting===!0){let Se=D.xr.getDepthSensingMesh();Se!==null&&nl(Se,G,-1/0,D.sortObjects)}nl(S,G,0,D.sortObjects),w.finish(),B!==null&&B.updateLights(T.state.lightsArray),D.sortObjects===!0&&w.sort(Fe,yt),Wt=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Wt&&N.addToRenderList(w,S),this.info.autoReset===!0&&this.info.reset(),et===!0&&W.beginShadows();let $=T.state.shadowsArray;if(se.render($,S,G),et===!0&&W.endShadows(),(J&&F.hasRenderPass())===!1){let Se=w.opaque,de=w.transmissive;if(T.setupLights(),G.isArrayCamera){let ve=G.cameras;if(de.length>0)for(let Ce=0,He=ve.length;Ce<He;Ce++){let Ze=ve[Ce];Oc(Se,de,S,Ze)}Wt&&N.render(S);for(let Ce=0,He=ve.length;Ce<He;Ce++){let Ze=ve[Ce];Uc(w,S,Ze,Ze.viewport)}}else de.length>0&&Oc(Se,de,S,G),Wt&&N.render(S),Uc(w,S,G)}ee!==null&&H===0&&(De.updateMultisampleRenderTarget(ee),De.updateRenderTargetMipmap(ee)),J&&F.end(D),S.isScene===!0&&S.onAfterRender(D,S,G),le.resetDefaultState(),Y=-1,Q=null,b.pop(),b.length>0?(T=b[b.length-1],De.setTextureUnits(T.state.textureUnits),et===!0&&W.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,x.pop(),x.length>0?w=x[x.length-1]:w=null,B!==null&&B.renderEnd()};function nl(S,G,te,J){if(S.visible===!1)return;if(S.layers.test(G.layers)){if(S.isGroup)te=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(G);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){let Se=G.isArrayCamera?ft:Be;if(!S.frustumCulled||S.intersectsFrustum(Se)){J&&ct.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ot);let de=q.update(S),ve=S.material;ve.visible&&w.push(S,de,ve,te,ct.z,null,G)}}else if(S.isMesh||S.isLine||S.isPoints){let Se=G.isArrayCamera?ft:Be;if(!S.frustumCulled||S.intersectsFrustum(Se)){let de=q.update(S),ve=S.material;if(J&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ct.copy(S.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),ct.copy(de.boundingSphere.center)),ct.applyMatrix4(S.matrixWorld).applyMatrix4(ot)),Array.isArray(ve)){let Ce=de.groups;for(let He=0,Ze=Ce.length;He<Ze;He++){let Ee=Ce[He],Je=ve[Ee.materialIndex];Je&&Je.visible&&w.push(S,de,Je,te,ct.z,Ee,G)}}else ve.visible&&w.push(S,de,ve,te,ct.z,null,G)}}}let me=S.children;for(let Se=0,de=me.length;Se<de;Se++)nl(me[Se],G,te,J)}function Uc(S,G,te,J){let{opaque:$,transmissive:me,transparent:Se}=S;T.setupLightsView(te),et===!0&&W.setGlobalState(D.clippingPlanes,te),J&&ce.viewport(ne.copy(J)),$.length>0&&Ur($,G,te),me.length>0&&Ur(me,G,te),Se.length>0&&Ur(Se,G,te),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Oc(S,G,te,J){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[J.id]===void 0){let Ee=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[J.id]=new Zt(1,1,{generateMipmaps:!0,type:Ee?Jt:dn,minFilter:li,samples:Math.max(4,it.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}let me=T.state.transmissionRenderTarget[J.id],Se=J.viewport||ne;me.setSize(Se.z*D.transmissionResolutionScale,Se.w*D.transmissionResolutionScale);let de=D.getRenderTarget(),ve=D.getActiveCubeFace(),Ce=D.getActiveMipmapLevel();D.setRenderTarget(me),D.getClearColor(ie),pe=D.getClearAlpha(),pe<1&&D.setClearColor(16777215,.5),D.clear(),Wt&&N.render(te);let He=D.toneMapping;D.toneMapping=Wn;let Ze=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),T.setupLightsView(J),et===!0&&W.setGlobalState(D.clippingPlanes,J),Ur(S,te,J),De.updateMultisampleRenderTarget(me),De.updateRenderTargetMipmap(me),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Je=0,Ct=G.length;Je<Ct;Je++){let pt=G[Je],{object:ht,geometry:Kt,material:Te,group:cn}=pt;if(Te.side===Gt&&ht.layers.test(J.layers)){let st=Te.side;Te.side=Lt,Te.needsUpdate=!0,Bc(ht,te,J,Kt,Te,cn),Te.side=st,Te.needsUpdate=!0,Ee=!0}}Ee===!0&&(De.updateMultisampleRenderTarget(me),De.updateRenderTargetMipmap(me))}D.setRenderTarget(de,ve,Ce),D.setClearColor(ie,pe),Ze!==void 0&&(J.viewport=Ze),D.toneMapping=He}function Ur(S,G,te){let J=G.isScene===!0?G.overrideMaterial:null;for(let $=0,me=S.length;$<me;$++){let Se=S[$],{object:de,geometry:ve,group:Ce}=Se,He=Se.material;He.allowOverride===!0&&J!==null&&(He=J),de.layers.test(te.layers)&&Bc(de,G,te,ve,He,Ce)}}function Bc(S,G,te,J,$,me){B!==null&&$.isNodeMaterial&&B.setObject(S,$),S.onBeforeRender(D,G,te,J,$,me),S.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),$.onBeforeRender(D,G,te,J,S,me),$.transparent===!0&&$.side===Gt&&$.forceSinglePass===!1?($.side=Lt,$.needsUpdate=!0,D.renderBufferDirect(te,G,J,$,S,me),$.side=Gn,$.needsUpdate=!0,D.renderBufferDirect(te,G,J,$,S,me),$.side=Gt):D.renderBufferDirect(te,G,J,$,S,me),S.onAfterRender(D,G,te,J,$,me)}function zc(S){let G=0;for(let te of S)te.texture!==null&&G++;return G}function Os(S,G,te){G.isScene!==!0&&(G=wt);let J=Re.get(S),$=T.state.lights,me=T.state.shadowsArray,Se=$.state.version,de=R.getParameters(S,$.state,me,G,te,T.state.lightProbeGridArray),ve=R.getProgramCacheKey(de),Ce=J.programs;J.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?G.environment:null,J.fog=G.fog;let He=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;J.envMap=L.get(S.envMap||J.environment,He),J.envMapRotation=J.environment!==null&&S.envMap===null?G.environmentRotation:S.envMapRotation,Ce===void 0&&(S.addEventListener("dispose",at),Ce=new Map,J.programs=Ce,J.programVariants=new Map);let Ze=Ce.get(ve);if(Ze!==void 0){if(J.currentProgram===Ze&&J.lightsStateVersion===Se)return Vc(S,de),Ze}else de.uniforms=R.getUniforms(S),B!==null&&S.isNodeMaterial&&B.build(S,te,de),S.onBeforeCompile(de,D),Ze=R.acquireProgram(de,ve),Ce.set(ve,Ze),J.uniforms=de.uniforms;let Ee=J.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ee.clippingPlanes=W.uniform),Vc(S,de),J.needsLights=Ld(S),J.lightsStateVersion=Se,J.needsLights&&(Ee.ambientLightColor.value=$.state.ambient,Ee.lightProbe.value=$.state.probe,Ee.sunLights.value=$.state.sun,Ee.sunLightShadows.value=$.state.sunShadow,Ee.directionalLights.value=$.state.directional,Ee.directionalLightShadows.value=$.state.directionalShadow,Ee.spotLights.value=$.state.spot,Ee.spotLightShadows.value=$.state.spotShadow,Ee.rectAreaLights.value=$.state.rectArea,Ee.ltc_1.value=$.state.rectAreaLTC1,Ee.ltc_2.value=$.state.rectAreaLTC2,Ee.pointLights.value=$.state.point,Ee.pointLightShadows.value=$.state.pointShadow,Ee.hemisphereLights.value=$.state.hemi,Ee.sunShadowMatrix.value=$.state.sunShadowMatrix,Ee.sunShadowCascade.value=$.state.sunShadowCascade,Ee.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ee.spotLightMatrix.value=$.state.spotLightMatrix,Ee.spotLightMap.value=$.state.spotLightMap,Ee.pointShadowMatrix.value=$.state.pointShadowMatrix),J.numLightProbeGrids=zc(T.state.lightProbeGridArray),J.currentProgram=Ze,J.uniformsList=null,Ze}function Cd(S,G,te,J,$){let me=Re.get(S),Se=me.currentProgram.id+","+J+","+$,de=me.programVariants.get(Se);return de===void 0?(de=Os(S,G,te),me.programVariants.set(Se,de)):(me.currentProgram=de,me.uniformsList=null,me.outputColorSpace=J,me.toneMapping=$),de}function Hc(S){if(S.uniformsList===null){let G=S.currentProgram.getUniforms();S.uniformsList=Ps.seqWithValue(G.seq,S.uniforms)}return S.uniformsList}function Vc(S,G){let te=Re.get(S);te.outputColorSpace=G.outputColorSpace,te.batching=G.batching,te.batchingColor=G.batchingColor,te.instancing=G.instancing,te.instancingColor=G.instancingColor,te.instancingMorph=G.instancingMorph,te.skinning=G.skinning,te.morphTargets=G.morphTargets,te.morphNormals=G.morphNormals,te.morphColors=G.morphColors,te.morphTargetsCount=G.morphTargetsCount,te.numClippingPlanes=G.numClippingPlanes,te.numIntersection=G.numClipIntersection,te.vertexAlphas=G.vertexAlphas,te.vertexTangents=G.vertexTangents,te.toneMapping=G.toneMapping}function Pd(S,G,te,J,$){G.isScene!==!0&&(G=wt),De.resetTextureUnits();let me=G.fog,Se=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?G.environment:null,de=ee===null?D.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:$e.workingColorSpace,ve=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Ce=L.get(J.envMap||Se,ve),He=J.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,Ze=!!te.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ee=!!te.morphAttributes.position,Je=!!te.morphAttributes.normal,Ct=!!te.morphAttributes.color,pt=Wn;J.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(pt=D.toneMapping);let ht=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Kt=ht!==void 0?ht.length:0,Te=Re.get(J),cn=T.state.lights;if(et===!0&&(It===!0||S!==Q)){let St=S===Q&&J.id===Y;W.setState(J,S,St)}let st=!1,Pi=!1;J.version===Te.__version?Te.needsLights&&Te.lightsStateVersion!==cn.state.version||$.isBatchedMesh&&Te.batching===!1||!$.isBatchedMesh&&Te.batching===!0||$.isBatchedMesh&&Te.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Te.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Te.instancing===!1||!$.isInstancedMesh&&Te.instancing===!0||$.isSkinnedMesh&&Te.skinning===!1||!$.isSkinnedMesh&&Te.skinning===!0||$.isInstancedMesh&&Te.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Te.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Te.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Te.instancingMorph===!1&&$.morphTexture!==null||Te.envMap!==Ce||J.fog===!0&&Te.fog!==me||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==W.numPlanes||Te.numIntersection!==W.numIntersection)||Te.vertexAlphas!==He||Te.vertexTangents!==Ze||Te.morphTargets!==Ee||Te.morphNormals!==Je||Te.morphColors!==Ct||Te.morphTargetsCount!==Kt||Te.numLightProbeGrids!==zc(T.state.lightProbeGridArray)?st=!0:(Te.outputColorSpace!==de||Te.toneMapping!==pt)&&(Pi=!0):(st=!0,Te.__version=J.version);let jt=Te.currentProgram;(st===!0||Pi===!0)&&(jt=Pi===!0?Cd(J,G,$,de,pt):Os(J,G,$),B&&J.isNodeMaterial&&B.onUpdateProgram(J,jt,Te));let Or=!1,fi=!1,Ii=!1,tt=jt.getUniforms(),Xt=Te.uniforms;if(ce.useProgram(jt.program)&&(Or=!0,fi=!0,Ii=!0),J.id!==Y&&(Y=J.id,fi=!0),Or||Q!==S){ce.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),tt.setValue(X,"projectionMatrix",S.projectionMatrix),tt.setValue(X,"viewMatrix",S.matrixWorldInverse);let Bt=tt.map.cameraPosition;Bt!==void 0&&Bt.setValue(X,ln.setFromMatrixPosition(S.matrixWorld)),it.logarithmicDepthBuffer&&tt.setValue(X,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&tt.setValue(X,"isOrthographic",S.isOrthographicCamera===!0),Q!==S&&(Q=S,fi=!0,Ii=!0)}if(Te.needsLights&&(cn.state.sunShadowMap.length>0&&tt.setValue(X,"sunShadowMap",cn.state.sunShadowMap,De),cn.state.directionalShadowMap.length>0&&tt.setValue(X,"directionalShadowMap",cn.state.directionalShadowMap,De),cn.state.spotShadowMap.length>0&&tt.setValue(X,"spotShadowMap",cn.state.spotShadowMap,De),cn.state.pointShadowMap.length>0&&tt.setValue(X,"pointShadowMap",cn.state.pointShadowMap,De)),$.isSkinnedMesh){tt.setOptional(X,$,"bindMatrix"),tt.setOptional(X,$,"bindMatrixInverse");let St=$.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),tt.setValue(X,"boneTexture",St.boneTexture,De))}$.isBatchedMesh&&(tt.setOptional(X,$,"batchingTexture"),tt.setValue(X,"batchingTexture",$._matricesTexture,De),tt.setOptional(X,$,"batchingIdTexture"),tt.setValue(X,"batchingIdTexture",$._indirectTexture,De),tt.setOptional(X,$,"batchingColorTexture"),$._colorsTexture!==null&&tt.setValue(X,"batchingColorTexture",$._colorsTexture,De));let An=te.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&K.update($,te,jt),(fi||Te.receiveShadow!==$.receiveShadow)&&(Te.receiveShadow=$.receiveShadow,tt.setValue(X,"receiveShadow",$.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&G.environment!==null&&(Xt.envMapIntensity.value=G.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=dx()),fi){if(tt.setValue(X,"toneMappingExposure",D.toneMappingExposure),Te.needsLights&&Id(Xt,Ii),me&&J.fog===!0&&Z.refreshFogUniforms(Xt,me),Z.refreshMaterialUniforms(Xt,J,he,Pe,T.state.transmissionRenderTarget[S.id]),Te.needsLights&&Te.numLightProbeGrids>0){let St=y,Bt=0;for(let Zn of T.state.lightProbeGridArray)Zn.texture!==null&&(St.textures[Bt]=Zn.texture,St.min[Bt]=Zn.boundingBox.min,St.max[Bt]=Zn.boundingBox.max,St.resolution[Bt]=Zn.resolution,Bt++);for(let Zn in St)St[Zn].length=Bt;Xt.probesSH.value=St.textures,Xt.probesMin.value=St.min,Xt.probesMax.value=St.max,Xt.probesResolution.value=St.resolution}Ps.upload(X,Hc(Te),Xt,De)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ps.upload(X,Hc(Te),Xt,De),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&tt.setValue(X,"center",$.center),tt.setValue(X,"modelViewMatrix",$.modelViewMatrix),tt.setValue(X,"normalMatrix",$.normalMatrix),tt.setValue(X,"modelMatrix",$.matrixWorld),J.uniformsGroups!==void 0){let St=J.uniformsGroups;for(let Bt=0,Zn=St.length;Bt<Zn;Bt++){let kc=St[Bt];ye.update(kc,jt),ye.bind(kc,jt)}}return jt}function Id(S,G){S.ambientLightColor.needsUpdate=G,S.lightProbe.needsUpdate=G,S.sunLights.needsUpdate=G,S.sunLightShadows.needsUpdate=G,S.directionalLights.needsUpdate=G,S.directionalLightShadows.needsUpdate=G,S.pointLights.needsUpdate=G,S.pointLightShadows.needsUpdate=G,S.spotLights.needsUpdate=G,S.spotLightShadows.needsUpdate=G,S.rectAreaLights.needsUpdate=G,S.hemisphereLights.needsUpdate=G}function Ld(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(S,G,te){let J=Re.get(S);J.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Re.get(S.texture).__webglTexture=G,Re.get(S.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:te,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,G){let te=Re.get(S);te.__webglFramebuffer=G,te.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(S,G=0,te=0){ee=S,V=G,H=te;let J=null,$=!1,me=!1;if(S){let de=Re.get(S);if(de.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(X.FRAMEBUFFER,de.__webglFramebuffer),ne.copy(S.viewport),_e.copy(S.scissor),we=S.scissorTest,ce.viewport(ne),ce.scissor(_e),ce.setScissorTest(we),Y=-1;return}else if(de.__webglFramebuffer===void 0)De.setupRenderTarget(S);else if(de.__hasExternalTextures)De.rebindTextures(S,Re.get(S.texture).__webglTexture,Re.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let He=S.depthTexture;if(de.__boundDepthTexture!==He){if(He!==null&&Re.has(He)&&(S.width!==He.image.width||S.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");De.setupDepthRenderbuffer(S)}}let ve=S.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(me=!0);let Ce=Re.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ce[G])?J=Ce[G][te]:J=Ce[G],$=!0):S.samples>0&&De.useMultisampledRTT(S)===!1?J=Re.get(S).__webglMultisampledFramebuffer:Array.isArray(Ce)?J=Ce[te]:J=Ce,ne.copy(S.viewport),_e.copy(S.scissor),we=S.scissorTest}else ne.copy(Ae).multiplyScalar(he).floor(),_e.copy(qe).multiplyScalar(he).floor(),we=Qe;if(te!==0&&(J=z),ce.bindFramebuffer(X.FRAMEBUFFER,J)&&ce.drawBuffers(S,J),ce.viewport(ne),ce.scissor(_e),ce.setScissorTest(we),$){let de=Re.get(S.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+G,de.__webglTexture,te)}else if(me){let de=G;for(let ve=0;ve<S.textures.length;ve++){let Ce=Re.get(S.textures[ve]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+ve,Ce.__webglTexture,te,de)}}else if(S!==null&&te!==0){let de=Re.get(S.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,de.__webglTexture,te)}Y=-1};function Gc(S){let G=Re.get(S);return(G.__readFormat!==S.format||G.__readType!==S.type)&&(G.__readFormat=S.format,G.__readType=S.type,G.__formatReadable=it.textureFormatReadable(S.format),G.__typeReadable=it.textureTypeReadable(S.type)),G}this.readRenderTargetPixels=function(S,G,te,J,$,me,Se,de=0){if(!(S&&S.isWebGLRenderTarget)){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Re.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se],Array.isArray(ve)&&(ve=ve[0])),ve){ce.bindFramebuffer(X.FRAMEBUFFER,ve);try{let Ce=S.textures[de],He=Ce.format,Ze=Ce.type;S.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+de);let Ee=Gc(Ce);if(Ee.__formatReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){Oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=S.width-J&&te>=0&&te<=S.height-$&&X.readPixels(G,te,J,$,ae.convert(He),ae.convert(Ze),me)}finally{let Ce=ee!==null?Re.get(ee).__webglFramebuffer:null;ce.bindFramebuffer(X.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(S,G,te,J,$,me,Se,de=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Re.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se],Array.isArray(ve)&&(ve=ve[0])),ve)if(G>=0&&G<=S.width-J&&te>=0&&te<=S.height-$){ce.bindFramebuffer(X.FRAMEBUFFER,ve);let Ce=S.textures[de],He=Ce.format,Ze=Ce.type;S.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+de);let Ee=Gc(Ce);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Je=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Je),X.bufferData(X.PIXEL_PACK_BUFFER,me.byteLength,X.STREAM_READ),X.readPixels(G,te,J,$,ae.convert(He),ae.convert(Ze),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);let Ct=ee!==null?Re.get(ee).__webglFramebuffer:null;ce.bindFramebuffer(X.FRAMEBUFFER,Ct);let pt=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await rh(X,pt,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Je),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,me),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(Je),X.deleteSync(pt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,G=null,te=0){let J=Math.pow(2,-te),$=Math.floor(S.image.width*J),me=Math.floor(S.image.height*J),Se=G!==null?G.x:0,de=G!==null?G.y:0;De.setTexture2D(S,0),X.copyTexSubImage2D(X.TEXTURE_2D,te,0,0,Se,de,$,me),ce.unbindTexture()},this.copyTextureToTexture=function(S,G,te=null,J=null,$=0,me=0){let Se,de,ve,Ce,He,Ze,Ee,Je,Ct,pt=S.isCompressedTexture?S.mipmaps[me]:S.image;if(te!==null)Se=te.max.x-te.min.x,de=te.max.y-te.min.y,ve=te.isBox3?te.max.z-te.min.z:1,Ce=te.min.x,He=te.min.y,Ze=te.isBox3?te.min.z:0;else{let tt=Math.pow(2,-$);Se=Math.floor(pt.width*tt),de=Math.floor(pt.height*tt),S.isDataArrayTexture?ve=pt.depth:S.isData3DTexture?ve=Math.floor(pt.depth*tt):ve=1,Ce=0,He=0,Ze=0}J!==null?(Ee=J.x,Je=J.y,Ct=J.z):(Ee=0,Je=0,Ct=0);let ht=ae.convert(G.format),Kt=ae.convert(G.type),Te;G.isData3DTexture?(De.setTexture3D(G,0),Te=X.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(De.setTexture2DArray(G,0),Te=X.TEXTURE_2D_ARRAY):(De.setTexture2D(G,0),Te=X.TEXTURE_2D),ce.activeTexture(X.TEXTURE0),ce.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,G.flipY),ce.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),ce.pixelStorei(X.UNPACK_ALIGNMENT,G.unpackAlignment);let cn=ce.getParameter(X.UNPACK_ROW_LENGTH),st=ce.getParameter(X.UNPACK_IMAGE_HEIGHT),Pi=ce.getParameter(X.UNPACK_SKIP_PIXELS),jt=ce.getParameter(X.UNPACK_SKIP_ROWS),Or=ce.getParameter(X.UNPACK_SKIP_IMAGES);ce.pixelStorei(X.UNPACK_ROW_LENGTH,pt.width),ce.pixelStorei(X.UNPACK_IMAGE_HEIGHT,pt.height),ce.pixelStorei(X.UNPACK_SKIP_PIXELS,Ce),ce.pixelStorei(X.UNPACK_SKIP_ROWS,He),ce.pixelStorei(X.UNPACK_SKIP_IMAGES,Ze);let fi=S.isDataArrayTexture||S.isData3DTexture,Ii=G.isDataArrayTexture||G.isData3DTexture;if(S.isDepthTexture){let tt=Re.get(S),Xt=Re.get(G),An=Re.get(tt.__renderTarget),St=Re.get(Xt.__renderTarget);ce.bindFramebuffer(X.READ_FRAMEBUFFER,An.__webglFramebuffer),ce.bindFramebuffer(X.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Bt=0;Bt<ve;Bt++)fi&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Re.get(S).__webglTexture,$,Ze+Bt),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Re.get(G).__webglTexture,me,Ct+Bt)),X.blitFramebuffer(Ce,He,Ce+Se,He+de,Ee,Je,Ee+Se,Je+de,X.DEPTH_BUFFER_BIT,X.NEAREST);ce.bindFramebuffer(X.READ_FRAMEBUFFER,null),ce.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if($!==0||S.isRenderTargetTexture||Re.has(S)){let tt=Re.get(S),Xt=Re.get(G);ce.bindFramebuffer(X.READ_FRAMEBUFFER,A),ce.bindFramebuffer(X.DRAW_FRAMEBUFFER,k);for(let An=0;An<ve;An++)fi?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,tt.__webglTexture,$,Ze+An):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,tt.__webglTexture,$),Ii?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Xt.__webglTexture,me,Ct+An):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Xt.__webglTexture,me),$!==0?X.blitFramebuffer(Ce,He,Ce+Se,He+de,Ee,Je,Ee+Se,Je+de,X.COLOR_BUFFER_BIT,X.NEAREST):Ii?X.copyTexSubImage3D(Te,me,Ee,Je,Ct+An,Ce,He,Se,de):X.copyTexSubImage2D(Te,me,Ee,Je,Ce,He,Se,de);ce.bindFramebuffer(X.READ_FRAMEBUFFER,null),ce.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else Ii?S.isDataTexture||S.isData3DTexture?X.texSubImage3D(Te,me,Ee,Je,Ct,Se,de,ve,ht,Kt,pt.data):G.isCompressedArrayTexture?X.compressedTexSubImage3D(Te,me,Ee,Je,Ct,Se,de,ve,ht,pt.data):X.texSubImage3D(Te,me,Ee,Je,Ct,Se,de,ve,ht,Kt,pt):S.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,me,Ee,Je,Se,de,ht,Kt,pt.data):S.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,me,Ee,Je,pt.width,pt.height,ht,pt.data):X.texSubImage2D(X.TEXTURE_2D,me,Ee,Je,Se,de,ht,Kt,pt);ce.pixelStorei(X.UNPACK_ROW_LENGTH,cn),ce.pixelStorei(X.UNPACK_IMAGE_HEIGHT,st),ce.pixelStorei(X.UNPACK_SKIP_PIXELS,Pi),ce.pixelStorei(X.UNPACK_SKIP_ROWS,jt),ce.pixelStorei(X.UNPACK_SKIP_IMAGES,Or),me===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&X.generateMipmap(Te),ce.unbindTexture()},this.initRenderTarget=function(S){Re.get(S).__webglFramebuffer===void 0&&De.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?De.setTextureCube(S,0):S.isData3DTexture?De.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?De.setTexture2DArray(S,0):De.setTexture2D(S,0),ce.unbindTexture()},this.resetState=function(){V=0,H=0,ee=null,ce.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}};var Pr=new URLSearchParams(location.search),Ls=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&innerWidth<900;function qh(){let i=Pr.get("q");return i==="alta"||i==="media"||i==="baixa"?i:Ls?"baixa":"alta"}function Yh(i){let e=Math.min(devicePixelRatio||1,2);return i==="alta"?{segTerreno:384,arvores:2600,capim:9e4,flores:2500,sombra:2048,reflexo:.5,pixel:Math.min(e,1.75),nuvens:!0,pedras:220,juncos:900}:i==="media"?{segTerreno:280,arvores:1500,capim:42e3,flores:1400,sombra:1024,reflexo:.4,pixel:Math.min(e,1.4),nuvens:!0,pedras:140,juncos:500}:{segTerreno:200,arvores:700,capim:16e3,flores:600,sombra:0,reflexo:.28,pixel:1,nuvens:!0,pedras:70,juncos:250}}var Le={uTime:{value:0},uWindDir:{value:new ue(.8,.6).normalize()},uWind:{value:.4},uWindMs:{value:5},uSun:{value:new P(.3,.8,.3)},uCam:{value:new P}},Ke={vento:.4,ventoSuave:.4,angulo:.6,hora:10.6,autoHora:!1,tempo:0};function Zh(i){Ke.tempo+=i,Ke.ventoSuave+=(Ke.vento-Ke.ventoSuave)*Math.min(1,i*.8),Ke.angulo+=Math.sin(Ke.tempo*.05)*i*.02;let e=.6+Ke.ventoSuave*13.5;Le.uWind.value=Ke.ventoSuave,Le.uWindMs.value=e,Le.uWindDir.value.set(Math.cos(Ke.angulo),Math.sin(Ke.angulo)),Le.uTime.value=Ke.tempo}var Yn=`
uniform float uTime; uniform vec2 uWindDir; uniform float uWind; uniform float uWindMs;
float vh21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(vh21(i),vh21(i+vec2(1,0)),f.x), mix(vh21(i+vec2(0,1)),vh21(i+vec2(1,1)),f.x), f.y); }
float vfbm(vec2 p){ float a=0.5, s=0.0; for(int i=0;i<4;i++){ s+=a*vn(p); p=p*2.03+17.1; a*=0.5; } return s; }
vec2 vgrad(vec2 p){ float e=0.07; return vec2(vn(p+vec2(e,0.))-vn(p-vec2(e,0.)), vn(p+vec2(0.,e))-vn(p-vec2(0.,e)))/(2.*e); }
float rajada(vec2 p){
  vec2 q = p - uWindDir * uTime * (1.5 + uWindMs * 0.9);
  return 0.55*vn(q*0.018) + 0.32*vn(q*0.06+7.1) + 0.13*vn(q*0.22+3.3);
}
`;function Ft(i){let e=i>>>0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Lr=new Uint8Array(512),Za=new Uint8Array(512);(()=>{let i=Ft(20261122),e=Array.from({length:256},(t,n)=>n);for(let t=255;t>0;t--){let n=Math.floor(i()*(t+1));[e[t],e[n]]=[e[n],e[t]]}for(let t=0;t<512;t++)Lr[t]=e[t&255],Za[t]=Lr[t]%8})();var Rc=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]],fx=.5*(Math.sqrt(3)-1),Ir=(3-Math.sqrt(3))/6;function Jh(i,e){let t=(i+e)*fx,n=Math.floor(i+t),s=Math.floor(e+t),r=(n+s)*Ir,o=i-(n-r),a=e-(s-r),l=o>a?1:0,c=o>a?0:1,u=o-l+Ir,p=a-c+Ir,d=o-1+2*Ir,h=a-1+2*Ir,f=n&255,v=s&255,g=0,m=.5-o*o-a*a;if(m>0){m*=m;let _=Rc[Za[f+Lr[v]]];g+=m*m*(_[0]*o+_[1]*a)}if(m=.5-u*u-p*p,m>0){m*=m;let _=Rc[Za[f+l+Lr[v+c]]];g+=m*m*(_[0]*u+_[1]*p)}if(m=.5-d*d-h*h,m>0){m*=m;let _=Rc[Za[f+1+Lr[v+1]]];g+=m*m*(_[0]*d+_[1]*h)}return 70*g}function sn(i,e,t=4,n=2,s=.5){let r=1,o=1,a=0,l=0;for(let c=0;c<t;c++)a+=r*Jh(i*o,e*o),l+=r,r*=s,o*=n;return a/l}function $h(i,e,t=5){let n=1,s=1,r=0,o=0,a=1;for(let l=0;l<t;l++){let c=1-Math.abs(Jh(i*s,e*s));c*=c,c*=a,a=Math.min(1,Math.max(0,c*1.6)),r+=n*c,o+=n,n*=.5,s*=2.07}return r/o}var gt=(i,e,t)=>i<e?e:i>t?t:i,_n=(i,e,t)=>i+(e-i)*t,Ye=(i,e,t)=>{let n=gt((t-i)/(e-i),0,1);return n*n*(3-2*n)};var kt=700;var rn={cx:0,cz:-70,rx:235,rz:150},Ds={x:70,z:-88},Dr=0,$t={x:4,z:72},px=i=>i>18?i:Math.log1p(Math.exp(i));function qi(i,e){let t=sn(i*.0045+3.1,e*.0045-7.7,3)*.2,n=(i-rn.cx)/rn.rx,s=(e-rn.cz)/rn.rz,r=Math.hypot(n,s)+t+.05*sn(i*.02+5,e*.02+1,2),o=Math.hypot(i,e),a=5+9*sn(i*.0055+9,e*.0055+2,4)+2.5*sn(i*.03,e*.03,2),l=1.7+px(a*.9),c=gt(-e/Math.max(o,1),-1,1),u=Ye(190,540,o)*(.62+.5*Ye(-.3,.9,c)),p=$h(i*.0018+1.3,e*.0018+4.2,5),d=sn(i*.007,e*.007,4),h=l+u*(35+250*p+40*d),f=gt(1-r/.62,0,1),v=-13*Math.pow(f,.85),g=i-Ds.x,m=e-Ds.z;return v+=12.8*Math.exp(-(g*g+m*m)/882)*Ye(0,.2,f),_n(v,h,Ye(.6,1.03,r))}function mx(i,e,t,n){let s=Ye(.1,.46,sn(i*.0042+21,e*.0042-13,3)),r=1-Ye(70,135,t),o=Ye(2.6,6.5,t),a=1-Ye(.22,.5,n),l=Ye(40,110,Math.hypot(i-$t.x,e-$t.z));return s*r*o*a*l}function gx(i,e,t){return(1-t*.88)*Ye(.7,2,i)*(1-Ye(.18,.4,e))*(1-Ye(55,105,i))}function jh(i){let e=i+1,t=kt*2,n=t/i,s=new Float32Array(e*e);for(let h=0;h<e;h++)for(let f=0;f<e;f++)s[h*e+f]=qi(-kt+f*n,-kt+h*n);let r=new Float32Array(e*e*3),o=new Float32Array(e*e),a=new Float32Array(e*e),l=(h,f)=>s[gt(f,0,i)*e+gt(h,0,i)];for(let h=0;h<e;h++)for(let f=0;f<e;f++){let v=(l(f+1,h)-l(f-1,h))/(2*n),g=(l(f,h+1)-l(f,h-1))/(2*n),m=Math.hypot(v,1,g),_=h*e+f;r[_*3]=-v/m,r[_*3+1]=1/m,r[_*3+2]=-g/m;let E=1-r[_*3+1],y=-kt+f*n,w=-kt+h*n;o[_]=mx(y,w,s[_],E),a[_]=gx(s[_],E,o[_])}let c=new Uint16Array(e*e*4);for(let h=0;h<e*e;h++)c[h*4]=yi.toHalfFloat(s[h]),c[h*4+1]=yi.toHalfFloat(o[h]),c[h*4+2]=yi.toHalfFloat(a[h]),c[h*4+3]=yi.toHalfFloat(1);let u=new Oi(c,e,e,vn,Jt);u.minFilter=bt,u.magFilter=bt,u.wrapS=u.wrapT=Mn,u.needsUpdate=!0;let p=(h,f,v,g=1,m=0)=>{let _=gt((f+kt)/n,0,i-1e-4),E=gt((v+kt)/n,0,i-1e-4),y=Math.floor(_),w=Math.floor(E),T=_-y,x=E-w,b=h[(w*e+y)*g+m],F=h[(w*e+y+1)*g+m],D=h[((w+1)*e+y)*g+m],O=h[((w+1)*e+y+1)*g+m];return(b*(1-T)+F*T)*(1-x)+(D*(1-T)+O*T)*x},d=(h,f)=>Math.abs(h)<kt-1&&Math.abs(f)<kt-1;return{seg:i,tam:t,celula:n,alturas:s,normais:r,floresta:o,campo:a,textura:u,h:(h,f)=>d(h,f)?p(s,h,f):qi(h,f),normal:(h,f,v=new P)=>v.set(p(r,h,f,3,0),p(r,h,f,3,1),p(r,h,f,3,2)).normalize(),declive:(h,f)=>1-p(r,h,f,3,1),mascara:(h,f)=>({floresta:p(o,h,f),campo:p(a,h,f)})}}function xx(i){let e=i.seg+1,t=[],n=[];for(let c=0;c<e;c++)for(let u=0;u<e;u++){let p=c*e+u;t.push(-kt+u*i.celula,i.alturas[p],-kt+c*i.celula),n.push(i.normais[p*3],i.normais[p*3+1],i.normais[p*3+2])}let s=[];for(let c=0;c<i.seg;c++)for(let u=0;u<i.seg;u++){let p=c*e+u,d=p+1,h=p+e,f=h+1;s.push(p,h,d,d,h,f)}let r=t.length/3,o=[];for(let c=0;c<e;c++)o.push(c);for(let c=1;c<e;c++)o.push(c*e+i.seg);for(let c=i.seg-1;c>=0;c--)o.push(i.seg*e+c);for(let c=i.seg-1;c>=1;c--)o.push(c*e);o.forEach(c=>{t.push(t[c*3],t[c*3+1]-45,t[c*3+2]),n.push(n[c*3],n[c*3+1],n[c*3+2])});let a=o.length;for(let c=0;c<a;c++){let u=o[c],p=o[(c+1)%a],d=r+c,h=r+(c+1)%a;s.push(u,d,p,p,d,h)}let l=new je;return l.setAttribute("position",new be(t,3)),l.setAttribute("normal",new be(n,3)),l.setIndex(s),l}function vx(){let n=[],s=[];for(let l=-73;l<=73;l++)for(let c=-73;c<=73;c++){let u=c*43.75,p=l*43.75,d=qi(u,p),h=(qi(u+4,p)-qi(u-4,p))/8,f=(qi(u,p+4)-qi(u,p-4))/8,v=Math.hypot(h,1,f);n.push(u,d,p),s.push(-h/v,1/v,-f/v)}let o=[];for(let l=0;l<146;l++)for(let c=0;c<146;c++){let u=(c-73+.5)*43.75,p=(l-73+.5)*43.75;if(Math.abs(u)<kt&&Math.abs(p)<kt)continue;let d=l*147+c,h=d+1,f=d+147,v=f+1;o.push(d,f,h,h,f,v)}let a=new je;return a.setAttribute("position",new be(n,3)),a.setAttribute("normal",new be(s,3)),a.setIndex(o),a}var _x="varying vec3 vWPos; varying float vDist; varying vec3 vWNor;",yx=`
varying vec3 vWPos; varying float vDist; varying vec3 vWNor;
uniform sampler2D uCampoTex; uniform float uMeia; uniform float uDentro;
${Yn}
vec3 terrenoCor(vec3 p, vec3 nW, float floresta, float campoM){
  float h = p.y;
  float slope = 1.0 - nW.y;
  float nA = vfbm(p.xz*0.045), nB = vfbm(p.xz*0.35+9.0), nC = vn(p.xz*2.6);
  vec3 grama1 = vec3(0.115,0.205,0.045), grama2 = vec3(0.235,0.30,0.075), seca = vec3(0.37,0.34,0.14);
  vec3 g = mix(grama1, grama2, smoothstep(0.25,0.75,nA*0.7+nB*0.5));
  g = mix(g, seca, smoothstep(0.55,0.85,nA)*0.55*(1.0-floresta));
  g *= 0.82 + 0.36*nC;
  vec3 chao = vec3(0.075,0.085,0.035) * (0.8+0.5*nB);
  vec3 col = mix(g, chao, floresta*0.85);
  // areia perto da \xE1gua, molhada na beira
  float areia = smoothstep(1.7, 0.55, h) * smoothstep(0.55, 0.15, slope+nB*0.18);
  vec3 areiaC = mix(vec3(0.60,0.52,0.36), vec3(0.45,0.38,0.26), smoothstep(0.7,0.0,h));
  col = mix(col, areiaC*(0.85+0.3*nC), clamp(areia,0.0,1.0));
  // rocha nas encostas e nas alturas
  float rocha = smoothstep(0.28, 0.5, slope + (nA-0.5)*0.22) + smoothstep(85.0, 150.0, h + (nB-0.5)*40.0)*0.7;
  vec3 rochaC = mix(vec3(0.30,0.285,0.27), vec3(0.45,0.42,0.38), vn(p.xz*0.9 + p.y*0.15));
  rochaC *= 0.8 + 0.4*vn(vec2(p.y*1.7, p.x*0.2));
  col = mix(col, rochaC, clamp(rocha,0.0,1.0));
  // neve
  float neve = smoothstep(150.0, 185.0, h + (nA-0.5)*45.0) * smoothstep(0.75, 0.35, slope);
  col = mix(col, vec3(0.90,0.93,0.98), clamp(neve,0.0,1.0));
  // fundo do lago: lama escura, com luz ondulante (c\xE1usticas) na parte rasa
  float sub = smoothstep(0.1, -0.5, h);
  float prof = clamp(-h/9.0, 0.0, 1.0);
  vec3 fundo = mix(vec3(0.20,0.19,0.13), vec3(0.04,0.06,0.06), prof);
  float cau = pow(1.0 - abs(vn(p.xz*0.7 + uTime*vec2(0.25,0.18))*2.0-1.0), 5.0) + pow(1.0 - abs(vn(p.xz*1.1 - uTime*vec2(0.2,0.3))*2.0-1.0), 6.0);
  fundo += cau * 0.10 * smoothstep(5.0, 0.0, -h);
  col = mix(col, fundo, sub);
  return col;
}`;function Kh(i,e){let t=new Vt({roughness:.96,metalness:0});return t.onBeforeCompile=n=>{n.uniforms.uTime=Le.uTime,n.uniforms.uWindDir=Le.uWindDir,n.uniforms.uWind=Le.uWind,n.uniforms.uWindMs=Le.uWindMs,n.uniforms.uCampoTex={value:i.textura},n.uniforms.uMeia={value:kt},n.uniforms.uDentro={value:e?1:0},n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${_x}`).replace("#include <begin_vertex>",`#include <begin_vertex>
vWNor = normalize(mat3(modelMatrix) * objectNormal); vWPos = (modelMatrix * vec4(transformed,1.0)).xyz; vDist = length((modelViewMatrix*vec4(transformed,1.0)).xyz);`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
${yx}`).replace("#include <color_fragment>",`#include <color_fragment>
        vec3 nW = normalize(vWNor);
        float flo = 0.0, cmp = 1.0;
        if (uDentro > 0.5) { vec4 tc = texture2D(uCampoTex, (vWPos.xz + uMeia) / (2.0*uMeia)); flo = tc.g; cmp = tc.b; }
        else { flo = (1.0 - smoothstep(60.0, 120.0, vWPos.y)) * smoothstep(0.1, 0.5, vfbm(vWPos.xz*0.0042+21.0)) * 0.6; }
        diffuseColor.rgb = terrenoCor(vWPos, nW, flo, cmp);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        { float fade = 1.0/(1.0 + vDist*0.025);
          vec2 pg = vgrad(vWPos.xz*0.8)*0.45 + vgrad(vWPos.xz*3.1)*0.18 + vgrad(vWPos.xz*0.12)*0.7;
          vec3 gw = vec3(-pg.x, 0.0, -pg.y) * fade * 0.55;
          normal = normalize(normal + (viewMatrix * vec4(gw,0.0)).xyz); }`)},t}function Qh(i){let e=new We(xx(i),Kh(i,!0));e.receiveShadow=!0,e.frustumCulled=!1;let t=new We(vx(),Kh(i,!1));return t.frustumCulled=!1,{interno:e,externo:t}}var Nr=class i extends We{constructor(){let e=i.SkyShader,t=new mt({name:e.name,uniforms:Va.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Lt,depthWrite:!1});super(new Dn(1,1,1),t),this.isSky=!0}};Nr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new P},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( vSunDirection.y );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// gradient at a lattice corner; sinless hash so every GPU produces the same clouds
		vec2 gradient( vec2 i ) {
			vec3 p = fract( i.xyx * vec3( 0.1031, 0.1030, 0.0973 ) );
			p += dot( p, p.yzx + 33.33 );
			return fract( ( p.xx + p.yz ) * p.zy ) * 2.0 - 1.0;
		}

		// 2D gradient noise: isotropic lobes like Perlin at value-noise cost
		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			vec2 u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // quintic fade
			float a = dot( gradient( i ), f );
			float b = dot( gradient( i + vec2( 1.0, 0.0 ) ), f - vec2( 1.0, 0.0 ) );
			float c = dot( gradient( i + vec2( 0.0, 1.0 ) ), f - vec2( 0.0, 1.0 ) );
			float d = dot( gradient( i + vec2( 1.0, 1.0 ) ), f - vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y ) * 1.6; // ~[-1,1]
		}

		// fbm; per-octave drift makes clouds billow instead of scrolling as a rigid stamp
		float fbm( vec2 p, float drift ) {
			float result = 0.0;
			float amplitude = 1.0;
			for ( int i = 0; i < 4; i ++ ) {
				result += amplitude * noise( p );
				amplitude *= 0.5;
				p = p * 2.0 + drift;
			}
			return result;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, direction.y ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - vSunDirection.y, 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = clamp( ( cosTheta - sunAngularDiameterCos ) * 50000.0, 0.0, 1.0 ) * showSunDisc;
			vec3 sundiscColor = ( 760.0 * sundisc ) * min( vSunE * Fex, 80.0 );

			vec3 texColor = ( Lin + L0 ) * 0.04 + sundiscColor + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Cloud density field
				float evolve = time * cloudSpeed * 300.0;
				float cloudNoise = clamp( fbm( cloudUV * 1000.0, evolve ) * 0.7 + 0.5, 0.0, 1.0 );

				// Large-scale coverage variation: clear gaps next to dense banks
				float region = noise( cloudUV * 300.0 ) * 0.37 + 0.5;
				float cov = clamp( cloudCoverage + ( region - 0.5 ) * 0.6, 0.0, 1.0 );

				// Carve clouds where noise rises above the coverage level
				float threshold = 1.0 - cov;
				float cloudMask = smoothstep( threshold, threshold + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.03 + 0.06 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting from the sky's own radiance
				float dayFactor = smoothstep( -0.08, 0.3, vSunDirection.y );
				vec3 sunColor = vSunE * Fex * 0.22 * 0.04; // 0.22 ~ albedo/pi, 0.04 = exposure; the aerial composite adds the eye-leg extinction
				vec3 skyAmbient = Lin * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

				// Beer-powder self-shadow from the sampled density
				float depth = max( 0.0, cloudNoise - threshold );
				float beer = exp( depth * -4.0 );
				float powder = 1.0 - beer * beer; // beer*beer == exp(-8*depth)
				float shade = mix( 0.45, 1.0, clamp( beer * powder * 2.6, 0.0, 1.0 ) ); // 2.6 = 1/0.385, normalizes beer*powder peak to 1

				// Henyey-Greenstein forward lobe ( g = 0.7 ): silver lining on rims toward the sun
				float silver = clamp( 0.51 / pow( 1.49 - cosTheta * 1.4, 1.5 ), 0.0, 3.0 ); // 0.51=1-g^2, 1.49=1+g^2, 1.4=2g
				float edge = cloudMask * ( 1.0 - cloudMask ) * 4.0;

				vec3 cloudColor = skyAmbient + sunColor * shade;
				cloudColor += sunColor * silver * edge * 0.6;
				cloudColor *= max( dayFactor, 0.03 );

				// Cloud opacity via Beer's law: density sets how solid the clouds get
				float alpha = ( 1.0 - exp( depth * cloudDensity * -12.0 ) ) * horizonFade;

				// Occlude the sun disc/glow behind opaque cloud
				texColor -= L0 * 0.04 * alpha;

				// Composite through the atmosphere so distant clouds dissolve into haze
				vec3 cloudAerial = mix( texColor, cloudColor, Fex );
				texColor = mix( texColor, cloudAerial, alpha );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function Mx(i,e=new P){let t=(i-6)/12*Math.PI;return e.set(Math.cos(t),Math.sin(t)*.93,Math.sin(t)*.38).normalize()}function ed(i,e,t){let n=new Nr;n.scale.setScalar(5200),n.renderOrder=-10,i.add(n);let s=n.material.uniforms;s.turbidity.value=3.2,s.rayleigh.value=1.6,s.mieCoefficient.value=.0045,s.mieDirectionalG.value=.82;let r=new Es(16777215,3);r.castShadow=!1,i.add(r,r.target);let o=new Es(9414399,0);i.add(o);let a=new pr(10404863,3751978,.6);i.add(a),i.fog=new nr(11126758,.0011);let l=Ft(777),c=2600,u=new Float32Array(c*3),p=new Float32Array(c),d=new Float32Array(c),h=new Float32Array(c*3);for(let B=0;B<c;B++){let z,A,k;if(B<900){let H=l()*Math.PI*2,ee=(l()+l()+l()-1.5)*.18,Y=new P(Math.cos(H),ee,Math.sin(H)).normalize();Y.applyAxisAngle(new P(1,0,0),.9),[z,A,k]=[Y.x,Y.y,Y.z]}else{let H=l()*2-1,ee=l()*Math.PI*2,Y=Math.sqrt(1-H*H);[z,A,k]=[Y*Math.cos(ee),H,Y*Math.sin(ee)]}u.set([z*4800,A*4800,k*4800],B*3),p[B]=B<900?.6+l()*1.1:.9+Math.pow(l(),4)*2.6,d[B]=l()*6.28;let V=l();h.set([.75+.25*V,.82+.1*V,1-.25*V],B*3)}let f=new je;f.setAttribute("position",new Tt(u,3)),f.setAttribute("aTam",new Tt(p,1)),f.setAttribute("aFase",new Tt(d,1)),f.setAttribute("aCor",new Tt(h,3));let v=new mt({transparent:!0,depthWrite:!1,blending:kn,fog:!1,uniforms:{uNoite:{value:0},uTime:Le.uTime,uPx:{value:e.getPixelRatio()}},vertexShader:`attribute float aTam; attribute float aFase; attribute vec3 aCor; uniform float uTime; uniform float uPx; varying float vA; varying vec3 vC;
      void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = aTam*uPx*(1.0+0.25*sin(uTime*1.6+aFase)); vA = 0.55+0.45*sin(uTime*2.1+aFase*3.0); vC = aCor; }`,fragmentShader:"uniform float uNoite; varying float vA; varying vec3 vC; void main(){ vec2 d = gl_PointCoord-0.5; float r = length(d); float a = smoothstep(0.5,0.0,r); gl_FragColor = vec4(vC, a*a*vA*uNoite); }"}),g=new Si(f,v);g.frustumCulled=!1,g.renderOrder=-9,i.add(g);let m=document.createElement("canvas");m.width=m.height=256;let _=m.getContext("2d"),E=_.createRadialGradient(128,128,20,128,128,128);E.addColorStop(0,"rgba(230,238,255,0.55)"),E.addColorStop(.35,"rgba(180,200,255,0.18)"),E.addColorStop(1,"rgba(160,180,255,0)"),_.fillStyle=E,_.fillRect(0,0,256,256),_.beginPath(),_.arc(128,128,46,0,Math.PI*2),_.fillStyle="#eef2fb",_.fill(),_.globalCompositeOperation="source-atop";let y=Ft(5);for(let B=0;B<22;B++)_.beginPath(),_.arc(98+y()*60,98+y()*60,4+y()*11,0,7),_.fillStyle=`rgba(150,160,185,${.1+y()*.18})`,_.fill();let w=new gn(m);w.colorSpace=Et;let T=new Ui(new Mi({map:w,transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1}));T.scale.setScalar(1e3),T.renderOrder=-8,i.add(T);let x=null;if(t){let B=new mt({transparent:!0,depthWrite:!1,side:Lt,fog:!1,uniforms:{uTime:Le.uTime,uWindDir:Le.uWindDir,uWind:Le.uWind,uWindMs:Le.uWindMs,uSun:Le.uSun,uCobertura:{value:.5},uLuz:{value:new fe(1,1,1)},uSombra:{value:new fe(.5,.55,.65)},uNoite:{value:0}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*p; }",fragmentShader:`${Yn}
        varying vec3 vDir; uniform vec3 uSun; uniform float uCobertura; uniform vec3 uLuz; uniform vec3 uSombra; uniform float uNoite;
        float dens(vec2 uv){ vec2 w = uv + uWindDir*uTime*(0.006+uWind*0.02);
          float b = vfbm(w*1.6); float d = vfbm(w*4.5+b*1.5+3.0);
          return smoothstep(uCobertura, uCobertura+0.28, b*0.75+d*0.4); }
        void main(){
          vec3 d = normalize(vDir); if (d.y < 0.015) discard;
          vec2 uv = d.xz / (d.y*0.85 + 0.22);
          float c = dens(uv);
          if (c < 0.01) discard;
          vec2 su = normalize(uSun.xz+1e-4)*0.07;
          float c2 = dens(uv + su*1.0);
          float luz = clamp(1.0 - (c2 - c)*2.2 - c*0.35, 0.0, 1.0);
          float borda = clamp(1.0 - c, 0.0, 1.0);
          vec3 col = mix(uSombra, uLuz, luz) + uLuz*pow(borda, 3.0)*0.55*smoothstep(-0.1,0.4,uSun.y);
          col = mix(col, col*vec3(0.12,0.15,0.28)*1.2, uNoite);
          float fade = smoothstep(0.015, 0.2, d.y);
          gl_FragColor = vec4(col, c*fade*0.96);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`});x=new We(new ri(4600,32,16),B),x.renderOrder=-7,x.frustumCulled=!1,i.add(x)}let b=new P,F=new fe,D=new fe;function O(B){let z=(Ke.hora%24+24)%24;Mx(z,b);let A=b.y;Le.uSun.value.copy(b),s.sunPosition.value.copy(b);let k=Ye(-.06,.2,A),V=(1-Ye(0,.42,A))*Ye(-.12,.03,A);s.turbidity.value=_n(2.4,7.5,V),s.rayleigh.value=_n(.9,2.6,V)*(.3+.7*k)+.15,s.mieCoefficient.value=_n(.004,.012,V),r.position.copy(B).addScaledVector(b,400),r.target.position.copy(B),r.color.setRGB(1,.55,.28).lerp(F.setRGB(1,.96,.9),Ye(.02,.5,A)),r.intensity=3.4*Ye(-.03,.2,A),o.position.copy(B).addScaledVector(b,-400),o.intensity=.55*Ye(.02,-.2,A),T.position.copy(B).addScaledVector(b,-3600),T.material.opacity=Ye(0,-.18,A);let H=F.setRGB(.66,.78,.92),ee=D.setRGB(.96,.62,.42),Y=new fe().copy(H).lerp(ee,V),Q=new fe(.018,.03,.07);if(Y.lerp(Q,1-Ye(-.2,0,A)*1),Y.lerp(new fe(.3,.22,.34),Ye(-.2,-.05,A)*(1-Ye(-.05,.02,A))*.5),i.fog.color.copy(Y),i.fog.density=_n(.0012,.0021,V)*(1+(1-k)*.2)*(1+Ke.ventoSuave*.15),a.color.copy(Y).lerp(new fe(.55,.7,1),.45*k),a.groundColor.setRGB(.22,.26,.15).multiplyScalar(.35+.65*k),a.intensity=_n(.16,.62,k),e.toneMappingExposure=_n(.95,.58,k)*_n(1,1.1,V),v.uniforms.uNoite.value=Ye(.02,-.28,A),x){let ne=x.material.uniforms;ne.uCobertura.value=.62-Ke.ventoSuave*.12,ne.uLuz.value.setRGB(1,.98,.95).lerp(F.setRGB(1,.62,.38),V).multiplyScalar(.5+.9*k),ne.uSombra.value.setRGB(.42,.5,.66).lerp(F.setRGB(.55,.38,.45),V).multiplyScalar(.3+.8*k),ne.uNoite.value=Ye(0,-.25,A)}n.position.copy(B),g.position.copy(B),x?.position.copy(B)}return{sky:n,sol:r,lua:o,hemi:a,atualizar:O,direcao:b,horizonte:()=>i.fog.color}}var hi=6,bx=[1,.66,.44,.29,.19,.125],Sx=[0,.28,-.34,.62,-.78,1.15],Ex=[1,.8,.62,.42,.3,.2],_t={dados:new Float32Array(hi*4),w:new Float32Array(hi),steep:.72,tempo:0};function td(i,e){let t=.6+i*13.5,n=gt(2.4+t*1.7,2.6,27),s=.012+.021*t;for(let r=0;r<hi;r++){let o=n*bx[r],a=Math.PI*2/o,l=e+Sx[r]*(.45+.55*i);_t.dados[r*4]=Math.cos(l),_t.dados[r*4+1]=Math.sin(l),_t.dados[r*4+2]=s*Ex[r],_t.dados[r*4+3]=a,_t.w[r]=Math.sqrt(9.81*a)}_t.steep=.55+.35*i}function Un(i,e,t=_t.tempo){let n=i,s=e;for(let o=0;o<2;o++){let a=0,l=0;for(let c=0;c<hi;c++){let u=_t.dados[c*4],p=_t.dados[c*4+1],d=_t.dados[c*4+2],h=_t.dados[c*4+3],f=gt(_t.steep/(h*d*hi+1e-4),0,1),v=h*(u*n+p*s)-_t.w[c]*t,g=Math.cos(v)*f*d;a+=u*g,l+=p*g}n=i-a,s=e-l}let r=0;for(let o=0;o<hi;o++){let a=_t.dados[o*4],l=_t.dados[o*4+1],c=_t.dados[o*4+2],u=_t.dados[o*4+3];r+=c*Math.sin(u*(a*n+l*s)-_t.w[o]*t)}return Dr+r}function nd(i,e,t=new P){let s=Un(i+.6,e)-Un(i-.6,e),r=Un(i,e+.6)-Un(i,e-.6);return t.set(-s/(2*.6),1,-r/(2*.6)).normalize()}function Tx(){let i=[0];for(let l=1;l<=64;l++)i.push(l*.9);let e=i[i.length-1],t=2200,n=84;for(let l=1;l<=n;l++)i.push(e*Math.pow(t/e,l/n));let s=288,r=[];for(let l=0;l<i.length;l++)for(let c=0;c<=s;c++){let u=c/s*Math.PI*2;r.push(Math.cos(u)*i[l],0,Math.sin(u)*i[l])}let o=[];for(let l=0;l<i.length-1;l++)for(let c=0;c<s;c++){let u=l*(s+1)+c,p=u+1,d=u+s+1,h=d+1;o.push(u,p,d,p,h,d)}let a=new je;return a.setAttribute("position",new be(r,3)),a.setIndex(o),a}var wx=`
uniform float uTime; uniform vec4 uOnda[6]; uniform float uOndaW[6]; uniform float uSteep; uniform vec3 uCam; uniform mat4 uTexMat;
varying vec3 vWorld; varying vec3 vNorm; varying vec4 vRefl; varying float vJac; varying float vFogDepth;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec2 p = wp.xz;
  float lod = smoothstep(220.0, 900.0, length(p - uCam.xz));
  vec3 disp = vec3(0.0); vec3 N = vec3(0.0, 1.0, 0.0); float jac = 1.0;
  for (int i = 0; i < 6; i++) {
    vec2 d = uOnda[i].xy; float A = uOnda[i].z; float k = uOnda[i].w;
    float att = 1.0 - lod * smoothstep(0.35, 1.1, k);
    A *= att;
    float Q = clamp(uSteep / (k*A*6.0 + 1e-4), 0.0, 1.0);
    float f = k * dot(d, p) - uOndaW[i] * uTime;
    float c = cos(f), s = sin(f);
    disp.xz += Q * A * d * c; disp.y += A * s;
    N.xz -= d * k * A * c; N.y -= Q * k * A * s;
    jac -= Q * k * A * s;
  }
  wp.xyz += disp;
  vWorld = wp.xyz; vNorm = normalize(N); vJac = jac;
  vRefl = uTexMat * wp;
  vec4 mv = viewMatrix * wp;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`,Ax=`
${Yn}
uniform sampler2D uRefl; uniform sampler2D uAlt; uniform float uMeia; uniform vec3 uSunDir; uniform vec3 uSunCol; uniform vec3 uCam;
uniform vec3 uRaso; uniform vec3 uFundo; uniform float uLuz; uniform vec3 uCeu;
uniform vec4 uRip[8]; uniform float uDebug;
uniform vec3 fogColor; uniform float fogDensity;
varying vec3 vWorld; varying vec3 vNorm; varying vec4 vRefl; varying float vJac; varying float vFogDepth;
void main(){
  vec3 V = normalize(uCam - vWorld);
  vec2 q = vWorld.xz;
  float amp = mix(0.05, 0.42, uWind);
  vec2 g1 = vgrad(q*0.85 + uWindDir*uTime*0.9);
  vec2 g2 = vgrad(q*2.6 - uWindDir*uTime*1.4 + 4.0);
  vec2 g3 = vgrad(q*7.0 + uWindDir*uTime*2.2 + 9.0);
  float distF = 1.0/(1.0 + length(uCam - vWorld)*0.004);
  vec3 N = vNorm;
  N.xz += (g1*0.55 + g2*0.28 + g3*0.12*distF) * amp;
  // ondula\xE7\xF5es (peixes pulando, patos, toques)
  for (int i = 0; i < 8; i++) {
    float age = uTime - uRip[i].z;
    if (age > 0.0 && age < 7.0 && uRip[i].w > 0.0) {
      vec2 dq = q - uRip[i].xy; float r = length(dq) + 1e-3;
      float front = age * 2.4;
      float env = exp(-age*0.55) * exp(-abs(r-front)*0.55) * uRip[i].w;
      float ph = (r - front) * 4.8;
      N.xz += (dq / r) * cos(ph) * env * 0.5;
    }
  }
  N = normalize(N);
  float cosT = clamp(dot(N, V), 0.0, 1.0);
  float F = 0.02 + 0.98 * pow(1.0 - cosT, 5.0);
  // reflexo (espelho do mundo, distorcido pelas ondas)
  vec2 ruv = vRefl.xy / vRefl.w + N.xz * (0.03 + 0.025*uWind);
  vec3 refl = texture2D(uRefl, ruv).rgb;
  // profundidade: l\xEA a altura do fundo do lago
  vec2 uvT = (vWorld.xz + uMeia) / (2.0*uMeia);
  float hT = texture2D(uAlt, clamp(uvT, 0.001, 0.999)).r;
  float depth = max(vWorld.y - hT, 0.0);
  float T = exp(-depth * 1.15 / max(V.y, 0.18));
  if (uDebug > 0.5) { gl_FragColor = vec4(depth*0.1, hT*0.1+0.5, F, 1.0); return; }
  vec3 corpo = mix(uRaso, uFundo, 1.0 - exp(-depth*0.38)) * uLuz;
  corpo += uCeu * 0.05 * (1.0 - T);
  float A = 1.0 - T * (1.0 - F);
  // brilho do sol
  vec3 H = normalize(V + uSunDir);
  float nh = max(dot(N, H), 0.0);
  vec3 spec = uSunCol * (pow(nh, 900.0) * 6.0 + pow(nh, 110.0) * 0.35) * (1.0 - T*0.0);
  vec3 C = (corpo * (1.0 - T) * (1.0 - F) + refl * F + spec) / max(A, 0.001);
  // espuma: na margem e nas cristas, mais com vento forte
  float nz = vfbm(q*0.9 + uWindDir*uTime*0.35) ;
  float margem = smoothstep(0.65, 0.0, depth + nz*0.35 - 0.12) * (0.55 + 0.45*sin(depth*13.0 - uTime*1.3 + nz*7.0));
  float crista = smoothstep(0.78, 0.45, vJac) * smoothstep(0.10, 0.65, uWind) * smoothstep(0.35, 0.7, nz);
  float espuma = clamp(margem*0.85 + crista, 0.0, 1.0);
  vec3 espC = vec3(0.92, 0.95, 0.97) * (0.25 + 0.75*uLuz) + uSunCol*0.04;
  C = mix(C, espC, espuma);
  A = max(A, espuma * 0.92);
  gl_FragColor = vec4(C, A);
  float fd = fogDensity * vFogDepth; float fogF = 1.0 - exp(-fd*fd);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, clamp(fogF, 0.0, 1.0));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function id(i,e,t,n){let s=new Zt(512,288,{type:Jt,depthBuffer:!0,samples:0});s.texture.minFilter=bt,s.texture.magFilter=bt,s.texture.generateMipmaps=!1;let r=Array.from({length:8},()=>new lt(0,0,-100,0)),o=new ke,a={uTime:Le.uTime,uWindDir:Le.uWindDir,uWind:Le.uWind,uWindMs:Le.uWindMs,uOnda:{value:Array.from({length:hi},()=>new lt)},uOndaW:{value:Array.from({length:hi},()=>0)},uSteep:{value:.7},uCam:Le.uCam,uTexMat:{value:o},uRefl:{value:s.texture},uAlt:{value:t.textura},uMeia:{value:kt},uSunDir:Le.uSun,uSunCol:{value:new fe(1,1,1)},uRaso:{value:new fe(.07,.34,.33)},uFundo:{value:new fe(.012,.075,.12)},uLuz:{value:1},uCeu:{value:new fe(.5,.7,1)},uRip:{value:r},uDebug:{value:0},fogColor:{value:new fe(11126758)},fogDensity:{value:.0012}},l=new mt({uniforms:a,vertexShader:wx,fragmentShader:Ax,transparent:!0,depthWrite:!1}),c=new We(Tx(),l);c.frustumCulled=!1,c.renderOrder=5,i.add(c);let u=new qt;u.layers.enableAll();let p=new hn(new P(0,1,0),-Dr),d=new P(0,Dr,0),h=new P,f=new ke,v=new P,g=new P,m=new P,_=new P(0,1,0),E=new lt,y=new lt,w=new hn,T=[],x=0;function b(A,k,V=1){r[x].set(A,k,Le.uTime.value,V),x=(x+1)%r.length}function F(A){T.push(A)}function D(A,k,V,H,ee,Y){_t.tempo=Y;for(let Q=0;Q<hi;Q++)a.uOnda.value[Q].set(_t.dados[Q*4],_t.dados[Q*4+1],_t.dados[Q*4+2],_t.dados[Q*4+3]),a.uOndaW.value[Q]=_t.w[Q];a.uSteep.value=_t.steep,c.position.set(Math.round(A.position.x/2)*2,0,Math.round(A.position.z/2)*2),a.uSunCol.value.copy(k.color).multiplyScalar(k.intensity*.55),a.uLuz.value=H,a.uCeu.value.copy(V),a.fogColor.value.copy(ee.color),a.fogDensity.value=ee.density}let O=null;function B(A,k){O=A>0?{w:A,h:k}:null}function z(A,k){if(h.setFromMatrixPosition(A.matrixWorld),f.extractRotation(A.matrixWorld),m.subVectors(d,h),m.dot(_)>0)return;m.reflect(_).negate().add(d),v.set(0,0,-1).applyMatrix4(f).add(h),g.subVectors(d,v).reflect(_).negate().add(d),u.position.copy(m),u.up.set(0,1,0).applyMatrix4(f).reflect(_),u.lookAt(g),u.far=A.far,u.near=A.near,u.fov=A.fov,u.aspect=A.aspect,u.updateMatrixWorld(),u.updateProjectionMatrix(),u.projectionMatrix.copy(A.projectionMatrix),u.matrixWorldInverse.copy(u.matrixWorld).invert(),o.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),o.multiply(u.projectionMatrix).multiply(u.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(_,d),w.copy(p).applyMatrix4(u.matrixWorldInverse),E.set(w.normal.x,w.normal.y,w.normal.z,w.constant);let V=u.projectionMatrix;y.x=(Math.sign(E.x)+V.elements[8])/V.elements[0],y.y=(Math.sign(E.y)+V.elements[9])/V.elements[5],y.z=-1,y.w=(1+V.elements[10])/V.elements[14],E.multiplyScalar(2/E.dot(y)),V.elements[2]=E.x,V.elements[6]=E.y,V.elements[10]=E.z+1-.003,V.elements[14]=E.w;let H=O?Math.max(64,O.w):Math.max(64,Math.floor(e.domElement.width*n)),ee=O?Math.max(64,O.h):Math.max(64,Math.floor(e.domElement.height*n));(s.width!==H||s.height!==ee)&&s.setSize(H,ee),c.visible=!1,T.forEach(ne=>ne.visible=!1);let Y=e.shadowMap.autoUpdate;e.shadowMap.autoUpdate=!1;let Q=e.getRenderTarget();e.setRenderTarget(s),e.clear(),e.render(k,u),e.setRenderTarget(Q),e.shadowMap.autoUpdate=Y,T.forEach(ne=>ne.visible=!0),c.visible=!0}return{malha:c,atualizar:D,renderReflexo:z,definirBase:B,ondular:b,ocultarNoReflexo:F,uniforms:a}}var Rx=`
attribute float aSway; attribute float aFlut;
varying float vRajada;
${Yn}`,Cx=`
vec3 transformed = vec3(position);
#ifdef USE_INSTANCING
  mat4 imx = instanceMatrix;
#else
  mat4 imx = mat4(1.0);
#endif
vec3 baseW = (modelMatrix * imx * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
mat3 im3 = mat3(imx);
float escala2 = dot(im3[0], im3[0]);
float rj = rajada(baseW.xz);
vRajada = rj;
float forca = uWind * (0.22 + 0.78 * rj) + 0.04;
float fase = baseW.x * 0.37 + baseW.z * 0.53;
float osc = 0.78 + 0.22 * sin(uTime * (1.1 + uWindMs * 0.12) + fase);
float curva = aSway * aSway * forca * 1.35 * osc;
vec3 desloc = vec3(uWindDir.x, -0.04, uWindDir.y) * curva;
float fl = aFlut * forca;
desloc += fl * 0.22 * vec3(sin(uTime * 7.3 + position.x * 5.1 + fase), 0.4 * sin(uTime * 6.1 + position.y * 4.7), sin(uTime * 8.1 + position.z * 5.9 + fase * 2.0));
transformed += (transpose(im3) * desloc) / escala2;
`;function Ns(i,e){i.uniforms.uTime=Le.uTime,i.uniforms.uWindDir=Le.uWindDir,i.uniforms.uWind=Le.uWind,i.uniforms.uWindMs=Le.uWindMs,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
${Rx}`).replace("#include <begin_vertex>",Cx),e&&(i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
varying float vRajada; uniform float uWind;`).replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= 0.82 + 0.62 * vRajada * (0.25 + uWind);`).replace("#include <normal_fragment_begin>",Pc()))}function Pc(){return Ve.normal_fragment_begin.replace(/gl_FrontFacing\s*\?\s*1\.0\s*:\s*-\s*1\.0/,"1.0")}function sd(i,e,t,n){let s=document.createElement("canvas");s.width=s.height=256;let r=s.getContext("2d"),o=Ft(n);r.clearRect(0,0,256,256);for(let l=0;l<e;l++){let c=o()*Math.PI*2,u=Math.sqrt(o())*108,p=128+Math.cos(c)*u,d=128+Math.sin(c)*u*.9,h=o()*Math.PI*2,f=t*(.7+o()*.6),v=f*.52;r.save(),r.translate(p,d),r.rotate(h),r.beginPath(),r.moveTo(0,-f/2),r.bezierCurveTo(v,-f/4,v,f/4,0,f/2),r.bezierCurveTo(-v,f/4,-v,-f/4,0,-f/2),r.fillStyle=i[Math.floor(o()*i.length)],r.fill(),r.strokeStyle="rgba(20,40,10,0.35)",r.lineWidth=.8,r.beginPath(),r.moveTo(0,-f/2),r.lineTo(0,f/2),r.stroke(),r.restore()}let a=new gn(s);return a.colorSpace=Et,a.anisotropy=4,a.generateMipmaps=!0,a}function Px(i){let e=document.createElement("canvas");e.width=128,e.height=256;let t=e.getContext("2d"),n=Ft(i);t.clearRect(0,0,128,256);let s=["#2f6b38","#3a7d44","#438a4d","#2a5f33","#4f9a56"];t.strokeStyle="#3a2a1a",t.lineWidth=2.2,t.beginPath(),t.moveTo(64,250),t.lineTo(64,6),t.stroke();for(let o=0;o<150;o++){let a=n(),l=250-a*240,c=n()<.5?-1:1,u=(1-a*.55)*(34+n()*26);t.strokeStyle=s[Math.floor(n()*s.length)],t.lineWidth=1.5+n()*.8,t.beginPath(),t.moveTo(64,l),t.lineTo(64+c*u,l-10-n()*22+u*.15),t.stroke()}let r=new gn(e);return r.colorSpace=Et,r.anisotropy=4,r}var Ja=()=>({pos:[],nor:[],col:[],uv:[],sway:[],flut:[],idx:[]});function $a(i){let e=new je;return e.setAttribute("position",new be(i.pos,3)),e.setAttribute("normal",new be(i.nor,3)),e.setAttribute("color",new be(i.col,3)),e.setAttribute("uv",new be(i.uv,2)),e.setAttribute("aSway",new be(i.sway,1)),e.setAttribute("aFlut",new be(i.flut,1)),e.setIndex(i.idx),e}function Cc(i,e,t,n,s,r){let o=i.pos.length/3,a=new P,l=new P,c=new P,u=new P(0,0,1);for(let p=0;p<e.length;p++){let d=e[p];a.subVectors(e[Math.min(p+1,e.length-1)],e[Math.max(p-1,0)]).normalize(),u.set(Math.abs(a.y)>.9?1:0,Math.abs(a.y)>.9?0:1,0),l.crossVectors(a,u).normalize(),c.crossVectors(a,l).normalize();for(let h=0;h<=n;h++){let f=h/n*Math.PI*2,v=Math.cos(f),g=Math.sin(f),m=l.x*v+c.x*g,_=l.y*v+c.y*g,E=l.z*v+c.z*g;i.pos.push(d.x+m*t[p],d.y+_*t[p],d.z+E*t[p]),i.nor.push(m,_,E);let y=s(p/(e.length-1),h/n);i.col.push(y[0],y[1],y[2]),i.uv.push(h/n,p/(e.length-1)),i.sway.push(gt(d.y/r,0,1)),i.flut.push(0)}}for(let p=0;p<e.length-1;p++)for(let d=0;d<n;d++){let h=o+p*(n+1)+d,f=h+1,v=h+n+1,g=v+1;i.idx.push(h,v,f,f,v,g)}}function ad(i,e,t,n,s,r,o,a,l=1){let c=i.pos.length/3,u=[[-1,-1],[1,-1],[-1,1],[1,1]];for(let[p,d]of u){let h=new P().copy(e).addScaledVector(t,p).addScaledVector(n,d),f=s(h);i.pos.push(h.x,h.y,h.z),i.nor.push(f.x,f.y,f.z),i.col.push(r.r*o,r.g*o,r.b*o),i.uv.push((p+1)/2,(d+1)/2),i.sway.push(gt(h.y/a,0,1)),i.flut.push(l)}i.idx.push(c,c+1,c+2,c+1,c+3,c+2)}var rd=i=>{let e=i()*2-1,t=i()*Math.PI*2,n=Math.sqrt(1-e*e);return new P(n*Math.cos(t),e,n*Math.sin(t))};function od(i,e){let t=Ft(e),n=i==="carvalho"?11+t()*3:9+t()*2.5,s=Ja(),r=Ja(),o=n*(i==="carvalho"?.4:.27),a=n*(i==="carvalho"?.52:.62),l=[],c=[],u=new ue((t()-.5)*.9,(t()-.5)*.9);for(let v=0;v<=8;v++){let g=v/8,m=g*a*1.18;l.push(new P(u.x*g*g,m,u.y*g*g)),c.push((i==="carvalho"?.42:.2)*(1-g*.78)*(v===0?1.25:1))}let p=(v,g)=>{let m=.82+.3*Math.sin(g*40+v*9)*Math.sin(v*23);if(i==="betula"){let _=Math.sin(v*38+g*6)>.72?.18:1;return[.78*_*m,.77*_*m,.72*_*m]}return[.2*m,.14*m,.095*m]};Cc(s,l,c,7,p,n);let d=l[l.length-1],h=i==="carvalho"?8:6,f=i==="carvalho"?[new fe(1,1.05,.9),new fe(.9,1,.85),new fe(1.1,1.1,.9)]:[new fe(1.1,1.08,.9),new fe(1,1,.85),new fe(1.15,1.1,.9)];for(let v=0;v<h;v++){let g=v/h*Math.PI*2+t()*.8,m=v===0?0:o*(.35+t()*.55),_=new P(d.x+Math.cos(g)*m,a+(t()-.25)*o*.75+(v===0?o*.35:0),d.z+Math.sin(g)*m);if(m>.5){let w=new P(l[5].x,l[5].y*(.8+t()*.3),l[5].z),T=w.clone().lerp(_,.55).add(new P(0,o*.12,0));Cc(s,[w,T,_.clone().lerp(w,.15)],[.12,.07,.03],5,x=>p(x,.5),n)}let E=o*(.5+t()*.28),y=i==="carvalho"?22:16;for(let w=0;w<y;w++){let T=rd(t).multiplyScalar(E*Math.cbrt(t())),x=_.clone().add(new P(T.x,T.y*.8,T.z)),b=rd(t),F=new P().crossVectors(b,new P(0,1,.01)).normalize(),D=new P().crossVectors(b,F).normalize(),O=(i==="carvalho"?1.65:1.3)*(.8+t()*.5)*(n/12);F.multiplyScalar(O),D.multiplyScalar(O);let B=gt(T.length()/E,0,1),z=_n(.5,1.12,B*.7+(x.y-a)/(o*3)*.3+.2);ad(r,x,F,D,A=>A.clone().sub(_).divideScalar(E).add(new P(0,.45,0)).normalize(),f[Math.floor(t()*f.length)],z,n)}}return{tronco:$a(s),folha:$a(r),H:n}}function Ix(i){let e=Ft(i),t=14+e()*8,n=Ja(),s=Ja(),r=[],o=[];for(let c=0;c<=8;c++){let u=c/8;r.push(new P((e()-.5)*.06,u*t*.97,(e()-.5)*.06)),o.push(.34*(1-u)**.9+.03)}Cc(n,r,o,7,(c,u)=>{let p=.85+.3*Math.sin(u*30+c*14);return[.25*p,.15*p,.1*p]},t);let a=[new fe(1,1,1),new fe(.9,.95,.9),new fe(1.1,1.1,1)],l=15;for(let c=0;c<l;c++){let u=c/(l-1),p=t*(.16+u*.8),d=.3*t*Math.pow(1-u,.85)+.55,h=Math.max(4,Math.round(8-u*4)),f=e()*6.28;for(let v=0;v<h;v++){let g=f+v/h*Math.PI*2+(e()-.5)*.4,m=new P(Math.cos(g),0,Math.sin(g)),_=.28+e()*.12,E=new P(m.x*.1,p,m.z*.1),y=new P(m.x*d,p-d*_,m.z*d),w=y.clone().sub(E),T=new P().crossVectors(w,new P(0,1,0)).normalize().multiplyScalar(d*.34),x=E.clone().add(y).multiplyScalar(.5),b=w.clone().multiplyScalar(.5),F=a[Math.floor(e()*a.length)],D=.55+.6*(d/(.3*t+.55))*0+.55*Math.min(1,u+.35),O=g,B=x,z=(k,V)=>new P().copy(B).addScaledVector(T,k).addScaledVector(b,V),A=Lx(s);for(let[k,V]of[[-1,-1],[1,-1],[-1,1],[1,1]]){let H=z(k,V),ee=new P(m.x*.75,.55,m.z*.75).normalize();s.pos.push(H.x,H.y,H.z),s.nor.push(ee.x,ee.y,ee.z);let Y=(V+1)/2,Q=D*(.7+.5*Y);s.col.push(F.r*Q,F.g*Q,F.b*Q),s.uv.push((k+1)/2,Y),s.sway.push(gt(H.y/t,0,1)),s.flut.push(.6+.4*Y)}s.idx.push(A,A+1,A+2,A+1,A+3,A+2)}}for(let c=0;c<2;c++){let u=c*Math.PI/2,d=new P(Math.cos(u),0,Math.sin(u)).clone().multiplyScalar(.55),h=new P(0,1.3,0);ad(s,new P(0,t*.97+.5,0),d,h,()=>new P(0,1,0),a[0],1,t,.5)}return{tronco:$a(n),folha:$a(s),H:t}}var Lx=i=>i.pos.length/3;function ld(i,e,t){let n=new dt,s=Ft(4242),r=new Vt({vertexColors:!0,roughness:.96,metalness:0});r.onBeforeCompile=z=>Ns(z,!1);let o=sd(["#6aa83a","#79b843","#54952c","#8fcc4d","#5fa84a"],110,30,11),a=sd(["#a6cc45","#b8da55","#92b83a","#cfe66a","#9ccc5e"],120,24,12),l=Px(13),c=(z,A=.42)=>{let k=new Vt({map:z,vertexColors:!0,alphaTest:A,side:Gt,roughness:.82,metalness:0,alphaToCoverage:!0});return k.onBeforeCompile=V=>Ns(V,!0),k},u=(z,A=.42)=>{let k=new zi({depthPacking:Ba,map:z,alphaTest:A});return k.onBeforeCompile=V=>Ns(V,!1),k},p=c(o),d=c(a),h=c(l,.35),f=u(o),v=u(a),g=u(l,.35),m=new zi({depthPacking:Ba});m.onBeforeCompile=z=>Ns(z,!1);let _=[];for(let z=0;z<3;z++)_.push({esp:"carvalho",g:od("carvalho",100+z),mat:p,prof:f});for(let z=0;z<2;z++)_.push({esp:"betula",g:od("betula",200+z),mat:d,prof:v});for(let z=0;z<3;z++)_.push({esp:"pinheiro",g:Ix(300+z),mat:h,prof:g});let E=_.map(()=>[]),y=_.map(()=>[]),w=[],T=new Map,x=(z,A)=>`${Math.floor(z/4)},${Math.floor(A/4)}`,b=(z,A,k)=>{for(let V=-1;V<=1;V++)for(let H=-1;H<=1;H++){let ee=T.get(`${Math.floor(z/4)+V},${Math.floor(A/4)+H}`);if(ee!==void 0){let Y=w[ee];if(Math.hypot(Y.x-z,Y.z-A)<k)return!1}}return!0},F=(z,A,k,V)=>{let H=i.h(z,A),ee=_.map((we,ie)=>[we,ie]).filter(([we])=>we.esp===k),[Y,Q]=ee[Math.floor(s()*ee.length)],ne=new ke().compose(new P(z,H-.12,A),new vt().setFromAxisAngle(new P(0,1,0),s()*Math.PI*2),new P(V,V,V));E[Q].push(ne);let _e=new fe().setHSL(.24+(s()-.5)*.05,.1+s()*.1,.5+(s()-.5)*.12);y[Q].push(k==="pinheiro"?new fe(.8+s()*.2,.85+s()*.15,.8+s()*.2):new fe(.85+s()*.3,.9+s()*.2,.75+s()*.3)),w.push({x:z,z:A,h:H,esp:k,raio:.5*V}),T.set(x(z,A),w.length-1)},D=0;for(;w.length<e&&D<e*60;){D++;let z=(s()*2-1)*690,A=(s()*2-1)*690,k=i.mascara(z,A);if(s()>k.floresta*1.15)continue;let V=i.h(z,A);if(V<2.2||!b(z,A,4.6))continue;let H=Ye(40,85,V),ee=1-Ye(3,16,V),Y=s(),Q=Y<H*.9+.22?"pinheiro":Y<H*.9+.22+.3+ee*.2?"carvalho":"betula";F(z,A,Q,.8+s()*.55-H*.2)}let O=[];for(let z=0;z<7;z++){let A=s()*Math.PI*2,k=4+s()*12;O.push([Ds.x+Math.cos(A)*k,Ds.z+Math.sin(A)*k,s()<.6?"betula":"carvalho",.7+s()*.3])}O.push([-34,58,"carvalho",1.35],[-52,40,"betula",1.1],[44,52,"carvalho",1.25],[62,38,"pinheiro",1],[-70,70,"pinheiro",1.2],[30,30,"betula",.95]);for(let[z,A,k,V]of O)i.h(z,A)>.9&&b(z,A,3.5)&&F(z,A,k,V);let B=[];return _.forEach((z,A)=>{let k=E[A].length;if(!k)return;let V=(H,ee,Y,Q)=>{let ne=new Sn(H,ee,k);return E[A].forEach((_e,we)=>{ne.setMatrixAt(we,_e),Q&&ne.setColorAt(we,y[A][we])}),ne.instanceMatrix.needsUpdate=!0,ne.instanceColor&&(ne.instanceColor.needsUpdate=!0),ne.castShadow=t,ne.receiveShadow=!1,ne.frustumCulled=!1,ne.customDepthMaterial=Y,n.add(ne),B.push(ne),ne};V(z.g.tronco,r,m,!1),V(z.g.folha,z.mat,z.prof,!0)}),{grupo:n,arvores:w,sombras:B}}function Dx(){let i=[],e=[],t=[],n=[],s=[];for(let a=0;a<3;a++){let l=a/3*Math.PI+.3,c=Math.cos(l),u=Math.sin(l),p=.12+a*.07,d=i.length/3;for(let h=0;h<4;h++){let f=h/3,v=.026*(1-f*.9),g=f,m=p*f*f;for(let _ of[-1,1]){let E=_*v;i.push(E*c-m*u*0+m*0,g,E*u+m*0);let y=E*c-0,w=E*u;i[i.length-3]=y+-u*m,i[i.length-1]=w+c*m,e.push(.2*c,.96,.2*u);let T=.35+.65*f;t.push(T*.55,T*.95,T*.35),n.push(f)}}for(let h=0;h<3;h++){let f=d+h*2;s.push(f,f+1,f+2,f+1,f+3,f+2)}}let o=new je;return o.setAttribute("position",new be(i,3)),o.setAttribute("normal",new be(e,3)),o.setAttribute("color",new be(t,3)),o.setAttribute("aY",new be(n,1)),o.setIndex(s),o}function Nx(){let i=[],e=[],t=[],n=[],s=[],r=[];for(let c of[0,1])for(let u of[-1,1])i.push(u*.006,c,0),e.push(0,1,0),t.push(.25,.5,.15),n.push(c),s.push(0);r.push(0,1,2,1,3,2);let o=6;for(let c=0;c<o;c++){let u=c/o*Math.PI*2,p=Math.cos(u),d=Math.sin(u),h=i.length/3,f=[[0,1,0],[p*.07-d*.03,1.02,d*.07+p*.03],[p*.07+d*.03,1.02,d*.07-p*.03]];for(let[v,g,m]of f)i.push(v,g,m),e.push(0,1,0),t.push(1,1,1),n.push(1),s.push(1);r.push(h,h+1,h+2,h,h+2,h+1)}let a=i.length/3;for(let[c,u]of[[.02,0],[-.01,.017],[-.01,-.017]])i.push(c,1.035,u),e.push(0,1,0),t.push(1,.8,.1),n.push(1),s.push(2);r.push(a,a+1,a+2,a,a+2,a+1);let l=new je;return l.setAttribute("position",new be(i,3)),l.setAttribute("normal",new be(e,3)),l.setAttribute("color",new be(t,3)),l.setAttribute("aY",new be(n,1)),l.setAttribute("aCab",new be(s,1)),l.setIndex(r),l}function Fx(i,e,t,n){i.uniforms.uTime=Le.uTime,i.uniforms.uWindDir=Le.uWindDir,i.uniforms.uWind=Le.uWind,i.uniforms.uWindMs=Le.uWindMs,i.uniforms.uCam=Le.uCam,i.uniforms.uJanela={value:t},i.uniforms.uCampoTex={value:e.textura},i.uniforms.uMeia={value:kt},i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
      attribute vec4 aRand; attribute float aY; ${n?"attribute float aCab; varying vec3 vFlor; varying float vCab;":""}
      uniform float uJanela; uniform vec3 uCam; uniform sampler2D uCampoTex; uniform float uMeia;
      varying float vRajada;
      ${Yn}`).replace("#include <begin_vertex>",`
      vec2 cam = uCam.xz;
      vec2 off = (fract(aRand.xy - cam / uJanela) - 0.5) * uJanela;
      vec2 base = cam + off;
      vec4 tc = texture2D(uCampoTex, clamp((base + uMeia) / (2.0 * uMeia), 0.001, 0.999));
      float dist = length(off);
      float dens = tc.b * (1.0 - smoothstep(uJanela * 0.28, uJanela * 0.5, dist));
      ${n?"dens *= smoothstep(0.62, 0.72, vn(base * 0.07 + 5.0)) * 0.9;":"dens *= 0.55 + 0.45 * smoothstep(0.2, 0.6, vn(base * 0.2));"}
      float keep = step(aRand.w, dens);
      float gh = ${n?"(0.28 + 0.3 * aRand.z)":"(0.34 + 0.5 * aRand.z * aRand.z + 0.18 * vn(base * 0.5))"} * keep;
      float yaw = aRand.z * 37.0;
      float cy = cos(yaw), sy = sin(yaw);
      vec3 lp = vec3(position.x * cy - position.z * sy, position.y * gh, position.x * sy + position.z * cy);
      float rj = rajada(base); vRajada = rj;
      float forca = uWind * (0.3 + 0.7 * rj) + 0.06;
      float osc = sin(uTime * (2.4 + uWindMs * 0.35) + base.x * 0.9 + base.y * 0.6 + aRand.z * 6.0);
      float curva = aY * aY * gh * (forca * 0.95 + 0.14 * forca * osc);
      lp.xz += uWindDir * curva; lp.y -= curva * 0.3;
      vec3 transformed = vec3(base.x + lp.x, tc.r - 0.03 + lp.y, base.y + lp.z);
      ${n?`vCab = aCab; float h6 = fract(aRand.z * 7.13);
      vFlor = h6 < 0.28 ? vec3(0.95, 0.95, 0.92) : h6 < 0.5 ? vec3(1.0, 0.82, 0.12) : h6 < 0.72 ? vec3(0.78, 0.28, 0.62) : h6 < 0.88 ? vec3(0.45, 0.4, 0.95) : vec3(1.0, 0.45, 0.18);`:""}
    `),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
varying float vRajada; uniform float uWind;${n?" varying vec3 vFlor; varying float vCab;":""}`).replace("#include <color_fragment>",`#include <color_fragment>
      ${n?"if (vCab > 1.5) diffuseColor.rgb = vec3(0.95, 0.7, 0.05); else if (vCab > 0.5) diffuseColor.rgb = vFlor * 0.9;":"diffuseColor.rgb *= 0.78 + 0.5 * vRajada * (0.2 + uWind);"}`).replace("#include <normal_fragment_begin>",Pc())}function cd(i,e,t){let n=new dt,s=(a,l,c,u,p)=>{let d=a.clone(),h=new ai;h.copy(d);let f=Ft(p),v=new Float32Array(l*4);for(let _=0;_<l*4;_++)v[_]=f();h.setAttribute("aRand",new In(v,4)),h.instanceCount=l;let g=new Vt({vertexColors:!0,side:Gt,roughness:.95,metalness:0});g.onBeforeCompile=_=>Fx(_,i,c,u);let m=new We(h,g);return m.frustumCulled=!1,m.receiveShadow=!1,m.castShadow=!1,n.add(m),m},r=Dx();s(r,Math.round(e*.42),34,!1,91),s(r,Math.round(e*.58),105,!1,92);let o=Nx();return s(o,Math.round(t*.55),40,!0,93),s(o,Math.round(t*.45),110,!0,94),{grupo:n}}function ud(i,e,t){let n=new dt,s=Ft(555),r=[];for(let u=0;u<3;u++){let p=new hr(1,3),d=p.attributes.position,h=[];for(let f=0;f<d.count;f++){let v=d.getX(f),g=d.getY(f),m=d.getZ(f),_=1+.32*sn(v*1.4+u*7,m*1.4+g,3)+.12*sn(v*4+g*3,m*4,2);d.setXYZ(f,v*_*(1.1+u*.1),g*_*.62,m*_);let E=.7+.5*sn(v*3+u,g*3,2),y=Math.max(0,sn(v*2,m*2+4,2))*.25;h.push(.5*E+y*.2,.48*E+y,.45*E)}p.setAttribute("color",new be(h,3)),p.computeVertexNormals(),r.push(p)}let o=new Vt({vertexColors:!0,roughness:.92,metalness:0}),a=[[],[],[]],l=0,c=0;for(;c<e&&l<e*40;){l++;let u=(s()*2-1)*640,p=(s()*2-1)*640,d=i.h(u,p),h=Ye(2.5,.2,d)*.9+Ye(30,120,d)*.5+i.declive(u,p)*1.2;if(s()>h*.7||d<-.4)continue;let f=.35+Math.pow(s(),2.2)*2.4*(1+Ye(40,140,d)*1.6),v=new ke().compose(new P(u,d+f*.08,p),new vt().setFromEuler(new tn((s()-.5)*.4,s()*6.28,(s()-.5)*.4)),new P(f,f*(.8+s()*.5),f));a[Math.floor(s()*3)].push(v),c++}return r.forEach((u,p)=>{if(!a[p].length)return;let d=new Sn(u,o,a[p].length);a[p].forEach((h,f)=>d.setMatrixAt(f,h)),d.castShadow=t,d.receiveShadow=!1,d.frustumCulled=!1,n.add(d)}),{grupo:n}}function hd(i,e){let t=Ft(777),n=[],s=[],r=[],o=[],a=[],l=[],c=2.2;for(let v=0;v<7;v++){let g=t()*Math.PI,m=Math.cos(g),_=Math.sin(g),E=c*(.55+t()*.45),y=(t()-.5)*.5,w=(t()-.5)*.5,T=(t()-.5)*.35,x=5,b=n.length/3;for(let F=0;F<=x;F++){let D=F/x,O=.035*(1-D*.85),B=D*E,z=T*D*D*E;for(let A of[-1,1]){n.push(y+z*-_+A*O*m,B,w+z*m+A*O*_),s.push(0,.9,.3);let k=.45+.55*D;r.push(.5*k+.12,.7*k+.1,.22*k),o.push(B/c),a.push(.1)}}for(let F=0;F<x;F++){let D=b+F*2;l.push(D,D+1,D+2,D+1,D+3,D+2)}if(v%3===0){let F=E*.78,D=6,O=n.length/3;for(let B=0;B<2;B++)for(let z=0;z<=D;z++){let A=z/D*Math.PI*2,k=F+B*.34,V=y+T*.6*-_*0+Math.cos(A)*.05,H=w+Math.sin(A)*.05;n.push(V,k,H),s.push(Math.cos(A),0,Math.sin(A)),r.push(.28,.16,.08),o.push(k/c),a.push(.1)}for(let B=0;B<D;B++){let z=O+B;l.push(z,z+D+1,z+1,z+1,z+D+1,z+D+2)}}}let u=new je;u.setAttribute("position",new be(n,3)),u.setAttribute("normal",new be(s,3)),u.setAttribute("color",new be(r,3)),u.setAttribute("aSway",new be(o,1)),u.setAttribute("aFlut",new be(a,1)),u.setIndex(l);let p=new Vt({vertexColors:!0,side:Gt,roughness:.9});p.onBeforeCompile=v=>Ns(v,!1);let d=[],h=0;for(;d.length<e&&h<e*60;){h++;let v=(t()*2-1)*330,g=-70+(t()*2-1)*260,m=i.h(v,g);if(m>.55||m<-1||sn(v*.03+3,g*.03-8,2)<-.05&&t()>.12)continue;let _=.6+t()*.7;d.push(new ke().compose(new P(v,m-.1,g),new vt().setFromAxisAngle(new P(0,1,0),t()*6.28),new P(_,_,_)))}let f=new Sn(u,p,Math.max(1,d.length));return d.forEach((v,g)=>f.setMatrixAt(g,v)),f.frustumCulled=!1,{malha:f}}var Ic=new Map,Ut=(i,e=.9)=>{let t=`${i}-${e}`;return Ic.has(t)||Ic.set(t,new Vt({color:16777215,roughness:e,metalness:0,vertexColors:!0})),Ic.get(t)};function on(i,e,t,n,s,r,o=14,a=1){let l=new ri(1,o,Math.max(8,o-4)),c=l.attributes.position,u=new fe(n),p=new fe(s),d=[];for(let f=0;f<c.count;f++){let v=c.getY(f),g=c.getX(f),m=c.getZ(f),_=Ye(-.45,.55,v),E=p.clone().lerp(u,_),y=.88+.24*sn(g*3+a,m*3+v*2,2);d.push(E.r*y,E.g*y,E.b*y),c.setXYZ(f,g*i,v*e,m*t)}l.setAttribute("color",new be(d,3)),l.computeVertexNormals();let h=new We(l,r);return h.castShadow=!0,h}function Lc(i,e,t,n,s=.9,r=7){let o=new bs(i,e,t,r,1);o.translate(0,-t/2,0);let a=[],l=new fe(n);for(let u=0;u<o.attributes.position.count;u++)a.push(l.r,l.g,l.b);o.setAttribute("color",new be(a,3));let c=new We(o,Ut(n,s));return c.castShadow=!0,c}function md(i,e,t,n=6){let s=new Ss(i,e,n),r=[],o=new fe(t);for(let a=0;a<s.attributes.position.count;a++)r.push(o.r,o.g,o.b);return s.setAttribute("color",new be(r,3)),new We(s,Ut(t,.85))}var Fs=(i,e,t=8)=>on(i,i,i,e,e,Ut(e,.4),t);function Ka(i,e,t,n,s,r=1){let o=i.h(t,n);e.position.set(t,o,n);let a=i.normal(t,n),l=new vt().setFromEuler(new tn(0,s,0)).multiply(new vt().setFromUnitVectors(new P(0,1,0),new P(0,1,0))),c=a.clone().applyAxisAngle(new P(0,1,0),-s),u=Math.atan2(-c.z,c.y)*.8,p=Math.atan2(c.x,c.y)*.8,d=new vt().setFromEuler(new tn(u,s,p,"YXZ"));e.quaternion.slerp(d,r)}var ja=8015662,dd=13481362;function Ux(i,e,t){let n=Ft(t),s=new dt,r=new dt;s.add(r);let o=Ut(ja,.95),a=new fe(ja).offsetHSL((n()-.5)*.02,0,(n()-.5)*.06).getHex(),l=on(.27,.31,.62,a,dd,o,16,t);l.position.set(0,1.04,0),r.add(l);let c=on(.26,.32,.3,a,dd,o,12,t+1);c.position.set(0,1.08,.38),r.add(c);let u=on(.27,.33,.32,a,12098164,o,12,t+2);u.position.set(0,1.06,-.4),r.add(u);let p=on(.07,.1,.06,15853266,15853266,Ut(15853266,.9),8);p.position.set(0,1.2,-.72),r.add(p);let d=new dt;d.position.set(0,1.25,.6),r.add(d);let h=Lc(.115,.075,.5,ja,.95,8);h.rotation.x=-Math.PI+.62,h.position.set(0,0,0),d.add(h);let f=new dt;f.position.set(0,.4,.3),d.add(f);let v=on(.085,.1,.17,7292970,12098164,Ut(7292970,.9),12,t+3);v.position.set(0,.02,.08),f.add(v);let g=on(.055,.06,.11,6176037,14074786,Ut(6176037,.9),10,t+4);g.position.set(0,-.03,.22),f.add(g);let m=Fs(.022,1380622,6);m.position.set(0,-.025,.325),f.add(m);for(let y of[-1,1]){let w=Fs(.02,723207,6);w.position.set(y*.075,.05,.1),f.add(w);let T=on(.035,.1,.02,7030055,14205856,Ut(7030055,.9),8);if(T.position.set(y*.1,.13,-.01),T.rotation.z=-y*.7,T.rotation.x=-.2,f.add(T),e){let x=[new P(0,0,0),new P(y*.05,.18,-.03),new P(y*.11,.36,-.1),new P(y*.1,.52,-.02)],b=new Ei(x),F=new We(new Bi(b,10,.016,5),Ut(14141864,.8));F.position.set(y*.05,.14,0),f.add(F);for(let D=0;D<3;D++){let O=b.getPoint(.3+D*.25),B=O.clone().add(new P(-y*.04,.13-D*.02,.1-D*.04)),z=new We(new Bi(new Ei([O,O.clone().lerp(B,.5).add(new P(0,.02,.02)),B]),5,.011,4),Ut(14141864,.8));z.position.set(y*.05,.14,0),f.add(z)}}}let _=[],E=[[-.14,.42,0],[.14,.42,Math.PI],[-.14,-.4,Math.PI],[.14,-.4,0]];for(let[y,w,T]of E){let x=new dt;x.position.set(y,.93,w),r.add(x);let b=Lc(.065,.042,.5,ja,.95);x.add(b);let F=new dt;F.position.set(0,-.5,0),x.add(F);let D=Lc(.036,.024,.45,6109986,.95);F.add(D);let O=md(.032,.07,1906451,6);O.rotation.x=Math.PI,O.position.set(0,-.48,.004),F.add(O),_.push({quadril:x,joelho:F,fase:T})}return s.scale.setScalar(i),{raiz:s,corpo:r,pescoco:d,cabeca:f,pernas:_}}function Ox(i){let e=new dt,t=Ft(i),n=[9073493,10193518,7232324,11575434][Math.floor(t()*4)],s=on(.11,.1,.17,n,14273976,Ut(n,1),12,i);s.position.set(0,.12,0),e.add(s);let r=on(.1,.1,.12,n,n,Ut(n,1),10,i+1);r.position.set(0,.13,-.1),e.add(r);let o=new dt;o.position.set(0,.2,.15),e.add(o);let a=on(.06,.06,.08,n,14273976,Ut(n,1),10,i+2);a.position.set(0,0,.03),o.add(a);let l=Fs(.012,14256778,6);l.position.set(0,-.01,.1),o.add(l);let c=[];for(let p of[-1,1]){let d=Fs(.012,1182986,6);d.position.set(p*.05,.02,.045),o.add(d);let h=on(.022,.1,.01,n,14726832,Ut(n,1),8,i+3);h.position.set(p*.028,.12,-.005),h.rotation.z=-p*.18,o.add(h),c.push(h)}let u=Fs(.04,16052198,8);return u.position.set(0,.15,-.23),e.add(u),{raiz:e,corpo:s,cabeca:o,orelhas:c}}function Bx(i,e){let t=new dt,n=Ft(e),s=i?1.9:1,r=n()<.5,o=i?16054008:r?9075290:10125149,a=i?16054008:r?2059082:9072720,l=on(.14*s,.1*s,.26*s,o,i?15067630:14274488,Ut(o,.85),14,e);l.position.set(0,.07*s,0),t.add(l);let c=md(.07*s,.17*s,o,5);c.rotation.x=-Math.PI/2-.3,c.position.set(0,.11*s,-.27*s),t.add(c);let u=new dt;u.position.set(0,.12*s,.17*s),t.add(u);let p=i?[new P(0,0,0),new P(0,.12,.08),new P(0,.3,.06),new P(0,.42,.14),new P(0,.44,.22)]:[new P(0,0,0),new P(0,.07,.04),new P(0,.15,.04),new P(0,.2,.07)],d=new Ei(p.map(y=>y.clone().multiplyScalar(1))),h=new Bi(d,12,i?.03:.028,7),f=new fe(o),v=[];for(let y=0;y<h.attributes.position.count;y++)v.push(f.r,f.g,f.b);h.setAttribute("color",new be(v,3));let g=new We(h,Ut(o,.85));u.add(g);let m=p[p.length-1],_=on(.04*1.1,.04,.06,a,a,Ut(a,.7),10,e+1);_.position.copy(m).add(new P(0,.01,.03)),u.add(_);let E=on(.026,.014,.06,i?15300895:14725152,i?15300895:14725152,Ut(i?15300895:14725152,.5),8,e+2);E.position.copy(m).add(new P(0,0,.1)),u.add(E);for(let y of[-1,1]){let w=Fs(.008,657930,5);w.position.copy(m).add(new P(y*.034,.016,.04)),u.add(w);let T=on(.02*s,.07*s,.17*s,o,o,Ut(o,.85),8,e+5);T.position.set(y*.13*s,.13*s,-.02*s),T.rotation.z=y*.25,t.add(T)}return{raiz:t,pesc:u}}function zx(){let i=new ri(1,14,10),e=i.attributes.position,t=[];for(let o=0;o<e.count;o++){let a=e.getX(o),l=e.getY(o),c=e.getZ(o),u=1-.65*Ye(0,1,-c);e.setXYZ(o,a*.07*u,l*.11*(.55+u*.5),c*.3);let p=new fe().setHSL(.07,.8,.5).lerp(new fe(.85,.88,.9),Ye(.2,-.8,l));t.push(p.r,p.g,p.b)}let n=new Ss(.09,.13,3);n.rotateX(-Math.PI/2),n.rotateZ(Math.PI/2),n.translate(0,0,-.34);let s=[];for(let o=0;o<n.attributes.position.count;o++)s.push(.9,.4,.15);return n.setAttribute("color",new be(s,3)),i.setAttribute("color",new be(t,3)),Hx([i,n])}function Hx(i){let e=[],t=[],n=[],s=[];for(let o of i){let a=e.length/3,l=o.index?o:o.toNonIndexed(),c=o.attributes.position,u=o.attributes.normal,p=o.attributes.color;for(let d=0;d<c.count;d++)e.push(c.getX(d),c.getY(d),c.getZ(d)),t.push(u.getX(d),u.getY(d),u.getZ(d)),n.push(p.getX(d),p.getY(d),p.getZ(d));if(o.index)for(let d=0;d<o.index.count;d++)s.push(a+o.index.getX(d));else for(let d=0;d<c.count;d++)s.push(a+d)}let r=new je;return r.setAttribute("position",new be(e,3)),r.setAttribute("normal",new be(t,3)),r.setAttribute("color",new be(n,3)),r.setIndex(s),r}function fd(i){let e=[],t=[],n=[],s=(p,d,h,f)=>(e.push(p,d,h),t.push(f),e.length/3-1),r=s(0,0,.22*i,0),o=s(-.05*i,0,-.1*i,0),a=s(.05*i,0,-.1*i,0),l=s(0,0,-.24*i,0),c=s(0,.04*i,.02*i,0);n.push(r,o,a,r,a,c,r,c,o,o,l,a);for(let p of[-1,1]){let d=s(p*.04*i,0,.1*i,0),h=s(p*.04*i,0,-.08*i,0),f=s(p*.42*i,0,-.06*i,1),v=s(p*.2*i,0,.1*i,.45);n.push(d,f,h,d,v,f),p>0?n.push(h,f,d,f,v,d):n.push(h,d,f,f,d,v)}let u=new je;return u.setAttribute("position",new be(e,3)),u.setAttribute("aAsa",new be(t,1)),u.setIndex(n),u}function pd(i,e){let t=new Vn({color:i,side:Gt});return t.onBeforeCompile=n=>{n.uniforms.uTime=Le.uTime,n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
attribute float aAsa; attribute float aFase; uniform float uTime;`).replace("#include <begin_vertex>",`vec3 transformed = vec3(position);
        float bate = sin(uTime * ${e.toFixed(1)} + aFase * 6.2831);
        transformed.y += aAsa * ( bate * 0.28 * abs(position.x) + 0.02 * sin(uTime * ${(e*.5).toFixed(1)} + aFase));`)},t}function gd(i,e,t,n){let s=new dt;i.add(s);let r=Ft(2026),o=t.position,a=(I,q)=>{let R=e.h(I,q);return R<1.5||R>60||e.declive(I,q)>.2?!1:e.mascara(I,q).floresta<.45&&Math.abs(I)<640&&Math.abs(q)<640},l=(I,q,R,Z=40)=>{for(let U=0;U<Z;U++){let C=r()*Math.PI*2,W=12+r()*R,se=I+Math.cos(C)*W,N=q+Math.sin(C)*W;if(a(se,N))return new ue(se,N)}return new ue(I,q)},c=[],u=new ue(-58,52);if(!a(u.x,u.y)){let I=l(-40,40,120,200);u.copy(I)}[[1.1,!0],[1,!0],[.95,!1],[.95,!1],[.92,!1],[.68,!1],[.64,!1]].forEach(([I,q],R)=>{let Z=Ux(I,q,40+R);Z.deslocamento=new ue((r()-.5)*18,(r()-.5)*18),Z.x=u.x+Z.deslocamento.x,Z.z=u.y+Z.deslocamento.y,Z.yaw=r()*6.28,Z.vel=0,Z.estado="pastar",Z.tEstado=r()*6,Z.alvo=new ue(Z.x,Z.z),Z.fase=r()*6,Z.comp=1.2*I,Z.escala=I,Z.pitchPescoco=0,Z.raiz.traverse(U=>{U.isMesh&&(U.castShadow=n)}),Ka(e,Z.raiz,Z.x,Z.z,Z.yaw,1),s.add(Z.raiz),c.push(Z)});let d=l(u.x,u.y,70),h=20;function f(I,q){h-=I,h<0&&(d=l(u.x,u.y,80),h=25+r()*30);let R=d.clone().sub(u),Z=R.length(),U=c.some(C=>C.estado==="andar"||C.estado==="fugir");Z>1&&U&&u.addScaledVector(R.normalize(),Math.min(Z,.7*I));for(let C of c){let W=Math.hypot(o.x-C.x,o.z-C.z);C.tEstado-=I,W<24&&C.estado!=="fugir"?(C.estado=C.estado==="alerta"||W<14?"fugir":"alerta",C.tEstado=C.estado==="fugir"?6+r()*3:2.5):C.tEstado<=0&&(C.estado==="fugir"||C.estado==="alerta"?(C.estado="andar",C.tEstado=3+r()*3):C.estado==="andar"?(C.estado=r()<.7?"pastar":"andar",C.tEstado=5+r()*9):(C.estado=r()<.5?"andar":"pastar",C.tEstado=4+r()*7),C.estado==="andar"&&C.alvo.set(u.x+C.deslocamento.x+(r()-.5)*8,u.y+C.deslocamento.y+(r()-.5)*8));let se=0,N=0;C.estado==="andar"?(se=.85,N=.1):C.estado==="pastar"?(se=0,N=1+.05*Math.sin(q*2+C.fase)):C.estado==="alerta"?(se=0,N=-.28):(se=4.6,N=-.1);let K=C.alvo.x,j=C.alvo.y;if(C.estado==="fugir"){let Ne=C.x-o.x,re=C.z-o.z,Ie=Math.hypot(Ne,re)+.001;K=C.x+Ne/Ie*20,j=C.z+re/Ie*20}if(C.estado==="alerta"&&(K=o.x,j=o.z),C.estado==="andar"||C.estado==="fugir"){let re=Math.atan2(K-C.x,j-C.z)-C.yaw;for(;re>Math.PI;)re-=6.2832;for(;re<-Math.PI;)re+=6.2832;C.yaw+=gt(re,-I*2.2,I*2.2)}else if(C.estado==="alerta"){let re=Math.atan2(K-C.x,j-C.z)-C.yaw;for(;re>Math.PI;)re-=6.2832;for(;re<-Math.PI;)re+=6.2832;C.yaw+=gt(re,-I*3,I*3)}C.vel+=(se-C.vel)*Math.min(1,I*3);let oe=C.x+Math.sin(C.yaw)*C.vel*I,ae=C.z+Math.cos(C.yaw)*C.vel*I;a(oe,ae)?(C.x=oe,C.z=ae):(C.tEstado=0,C.vel*=.5,C.alvo.copy(l(C.x,C.z,25))),C.pitchPescoco+=(N-C.pitchPescoco)*Math.min(1,I*3),C.pescoco.rotation.x=C.pitchPescoco,C.cabeca.rotation.x=-C.pitchPescoco*.45+(C.estado==="pastar"?.08*Math.sin(q*5+C.fase):0);let le=C.estado==="fugir"?8.5:4.2;C.fase+=I*le*(C.vel/(.001+(C.estado==="fugir"?4.6:.85)))*(C.vel>.05?1:0);let ye=gt(C.vel/.85,0,1)*.5*(C.estado==="fugir"?1:.65)+(C.estado==="fugir"?.25:0);for(let Ne of C.pernas){let re=C.fase+Ne.fase;Ne.quadril.rotation.x=Math.sin(re)*ye,Ne.joelho.rotation.x=-Math.max(0,Math.sin(re+1.1))*ye*1.5}C.corpo.position.y=Math.abs(Math.sin(C.fase*2))*.015*gt(C.vel,0,2),Ka(e,C.raiz,C.x,C.z,C.yaw,Math.min(1,I*6))}}let v=[];for(let I=0;I<7;I++){let q=Ox(70+I),R=l($t.x+(r()-.5)*40,$t.z-8+(r()-.5)*30,50,200);q.x=R.x,q.z=R.y,q.yaw=r()*6.28,q.hop=0,q.estado="parado",q.t=r()*4,q.alvo=R.clone(),q.raiz.scale.setScalar(1+r()*.2),Ka(e,q.raiz,q.x,q.z,q.yaw,1),s.add(q.raiz),v.push(q)}function g(I,q){for(let R of v){let Z=Math.hypot(o.x-R.x,o.z-R.z);R.t-=I;let U=Z<9;if(R.estado==="parado"){if(R.cabeca.rotation.x=.1*Math.sin(q*6+R.x)*(R.t<1?1:.3),R.orelhas.forEach((W,se)=>W.rotation.x=.1*Math.sin(q*2+se+R.x)),U||R.t<=0){R.estado="pulando",R.hop=0;let W=U?Math.atan2(R.x-o.x,R.z-o.z):r()*6.28;R.yaw=W+(r()-.5)*.5,R.t=U?.45:.55}}else{R.hop+=I;let W=R.hop/(U?.34:.5),se=(U?1.6:.55)*I/(U?.34:.5),N=R.x+Math.sin(R.yaw)*se,K=R.z+Math.cos(R.yaw)*se;a(N,K)?(R.x=N,R.z=K):R.yaw+=2.4,W>=1&&(R.estado="parado",R.t=U?.2:1+r()*5)}Ka(e,R.raiz,R.x,R.z,R.yaw,Math.min(1,I*8));let C=R.estado==="pulando"?gt(R.hop/(U?.34:.5),0,1):0;R.raiz.position.y+=Math.sin(C*Math.PI)*(U?.34:.17),R.corpo.rotation.x=-Math.sin(C*Math.PI)*.35}}let m=[],_=(I,q,R=1.4)=>e.h(I,q)<-R,E=(I,q,R)=>{for(let Z=0;Z<60;Z++){let U=r()*6.28,C=r()*R,W=I+Math.cos(U)*C,se=q+Math.sin(U)*C;if(_(W,se,1.8))return new ue(W,se)}return new ue(rn.cx,rn.cz)};for(let I=0;I<8;I++){let q=I>=6,R=Bx(q,120+I),Z=E(rn.cx+(q?30:-50+I*18),rn.cz+10,80);R.x=Z.x,R.z=Z.y,R.yaw=r()*6.28,R.vel=0,R.alvo=Z.clone(),R.t=r()*6,R.escala=1,R.mergulho=0,R.ondulou=0,R.raiz.position.set(R.x,0,R.z),s.add(R.raiz),m.push(R)}let y={fn:()=>{}};function w(I,q){for(let R of m){R.t-=I,R.t<=0&&(R.alvo=E(R.x+(r()-.5)*80,R.z+(r()-.5)*60,55),R.t=8+r()*16,R.mergulho=r()<.18?2.2:0);let U=Math.atan2(R.alvo.x-R.x,R.alvo.y-R.z)-R.yaw;for(;U>Math.PI;)U-=6.2832;for(;U<-Math.PI;)U+=6.2832;R.yaw+=gt(U,-I*.9,I*.9);let C=Math.hypot(R.alvo.x-R.x,R.alvo.y-R.z),W=R.mergulho>0?0:C>3?.55:.05;R.vel+=(W-R.vel)*Math.min(1,I*1.5);let se=R.x+Math.sin(R.yaw)*R.vel*I,N=R.z+Math.cos(R.yaw)*R.vel*I;_(se,N,1.2)?(R.x=se,R.z=N):R.alvo=E(R.x,R.z,40),R.mergulho>0&&(R.mergulho-=I);let K=Un(R.x,R.z,Ke.tempo),j=nd(R.x,R.z);R.raiz.position.set(R.x,K-.02,R.z);let oe=j.clone().applyAxisAngle(new P(0,1,0),-R.yaw),ae=new vt().setFromEuler(new tn(Math.atan2(-oe.z,oe.y)*.9,R.yaw,Math.atan2(oe.x,oe.y)*.9,"YXZ"));R.raiz.quaternion.slerp(ae,Math.min(1,I*5)),R.pesc.rotation.x=R.mergulho>0?Math.min(1.5,1.5*(1-Math.abs(R.mergulho-1.1)/1.1)):.08*Math.sin(q*.8+R.x),R.ondulou-=I,R.vel>.25&&R.ondulou<=0&&(y.fn(R.x-Math.sin(R.yaw)*.25,R.z-Math.cos(R.yaw)*.25,.35),R.ondulou=1.6)}}let T=zx(),x=new Vt({vertexColors:!0,roughness:.45});x.onBeforeCompile=I=>{I.uniforms.uTime=Le.uTime,I.vertexShader=I.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime; attribute float aFaseP;`).replace("#include <begin_vertex>",`vec3 transformed = vec3(position);
        float k = smoothstep(0.0, -0.4, position.z);
        transformed.x += sin(uTime * 9.0 + position.z * 9.0) * 0.07 * k * (0.4 + 0.6 * k);`)};let b=[];for(let I=0;I<16;I++){let q=new We(T,x);q.scale.setScalar(.9+r()*.9);let R=E(rn.cx+(r()-.5)*140,rn.cz+(r()-.5)*80,70);b.push({m:q,cx:R.x,cz:R.y,r:6+r()*16,w:(.18+r()*.3)*(r()<.5?-1:1),f:r()*6.28,prof:.7+r()*2.2,salto:-1,tSalto:6+r()*25,vx:0}),s.add(q)}let F=[],D=new Vn({color:15398655,transparent:!0,opacity:.85});for(let I=0;I<40;I++){let q=new We(new ri(.035,5,4),D);q.visible=!1,s.add(q),F.push({m:q,v:new P,vida:0})}let O=new P;function B(I,q){for(let R of b){R.f+=R.w*I;let Z=R.cx+Math.cos(R.f)*R.r,U=R.cz+Math.sin(R.f*.8)*R.r*.6,C=-Math.sin(R.f)*R.r*R.w,W=Math.cos(R.f*.8)*R.r*.6*R.w*.8;R.tSalto-=I;let se=Un(Z,U,q)-R.prof,N=-e.h(Z,U);if(se=Math.max(se,-N+.25),R.salto<0&&R.tSalto<=0&&N>2.2&&Math.abs(Z-rn.cx)<140){R.salto=0,R.tSalto=12+r()*30,y.fn(Z,U,.8);for(let K=0;K<6;K++)z(Z,Un(Z,U,q),U)}if(R.salto>=0){R.salto+=I;let K=R.salto/1;if(se=Un(Z,U,q)-.2+Math.sin(Math.min(1,K)*Math.PI)*1.15,K>=1){R.salto=-1,y.fn(Z,U,1);for(let j=0;j<6;j++)z(Z,Un(Z,U,q),U)}R.m.rotation.x=Math.cos(Math.min(1,K)*Math.PI)*-.9}else R.m.rotation.x*=.9;R.m.position.set(Z,se,U),O.set(C,0,W),R.m.rotation.y=Math.atan2(O.x,O.z)}for(let R of F){if(R.vida<=0){R.m.visible=!1;continue}R.vida-=I,R.v.y-=9.8*I,R.m.position.addScaledVector(R.v,I),R.m.position.y<Un(R.m.position.x,R.m.position.z,q)&&(R.vida=0)}}function z(I,q,R){let Z=F.find(U=>U.vida<=0);Z&&(Z.vida=1.4,Z.m.visible=!0,Z.m.position.set(I,q,R),Z.v.set((r()-.5)*1.6,2+r()*2.2,(r()-.5)*1.6))}let A=26,k=fd(1),V=new Float32Array(A);for(let I=0;I<A;I++)V[I]=r();let H=new ai;H.copy(k),H.setAttribute("aFase",new In(V,1)),H.instanceCount=A;let ee=new Sn(H,pd(1513500,16),A);ee.frustumCulled=!1,s.add(ee);let Y=Array.from({length:A},(I,q)=>({p:new P(rn.cx-60+r()*60,36+r()*12,rn.cz+r()*60),v:new P(Math.cos(q)*6,0,Math.sin(q)*6)})),Q=new ke,ne=new vt,_e=new P(1,1,1),we=new P,ie=new P,pe=new P(0,1,0);function Me(I,q){we.set(rn.cx+Math.cos(q*.045)*150,44+Math.sin(q*.11)*8,rn.cz+Math.sin(q*.06)*80);let R=new P;Y.forEach(Z=>R.add(Z.p)),R.multiplyScalar(1/A);for(let Z=0;Z<A;Z++){let U=Y[Z],C=new P;C.add(ie.copy(we).sub(U.p).normalize().multiplyScalar(2.2)),C.add(ie.copy(R).sub(U.p).multiplyScalar(.012));for(let K=0;K<A;K++){if(Z===K)continue;let j=U.p.distanceTo(Y[K].p);j<5&&j>.01&&C.add(ie.copy(U.p).sub(Y[K].p).multiplyScalar(2.5/(j*j)))}let W=e.h(U.p.x,U.p.z);U.p.y<W+14&&(C.y+=6),U.v.addScaledVector(C,I);let se=gt(U.v.length(),8,11.5);U.v.setLength(se),U.p.addScaledVector(U.v,I),ne.setFromRotationMatrix(Q.lookAt(new P(0,0,0),ie.copy(U.v).multiplyScalar(-1),pe));let N=new vt().setFromAxisAngle(new P(0,0,1),-C.x*.02);ne.multiply(N),Q.compose(U.p,ne,_e),ee.setMatrixAt(Z,Q)}ee.instanceMatrix.needsUpdate=!0}let Pe=fd(5.2),he=new ai;he.copy(Pe),he.setAttribute("aFase",new In(new Float32Array([.3]),1)),he.instanceCount=1;let Fe=new Sn(he,pd(2760984,1.6),1);Fe.frustumCulled=!1,s.add(Fe);function yt(I,q){let W=q*.07,se=new P(-90+Math.cos(W)*150,105+Math.sin(q*.13)*12+Math.sin(q*.37)*3,-250+Math.sin(W)*150*.75),N=new P(-Math.sin(W)*150,0,Math.cos(W)*150*.75).normalize(),K=new vt().setFromRotationMatrix(Q.lookAt(new P,N.clone().multiplyScalar(-1),pe));K.multiply(new vt().setFromAxisAngle(new P(0,0,1),.38)),Q.compose(se,K,new P(1,1,1)),Fe.setMatrixAt(0,Q),Fe.instanceMatrix.needsUpdate=!0}let Ae=30,qe=new je;{let I=[],q=[],R=[];for(let Z of[-1,1]){let U=I.length/3;I.push(0,0,.03,Z*.09,0,.08,Z*.1,0,-.06,0,0,-.04),q.push(0,1,1,0),R.push(U,U+1,U+2,U,U+2,U+3,U,U+2,U+1,U,U+3,U+2)}qe.setAttribute("position",new be(I,3)),qe.setAttribute("aAsa",new be(q,1)),qe.setIndex(R)}let Qe=new Float32Array(Ae);for(let I=0;I<Ae;I++)Qe[I]=r();let Be=new ai;Be.copy(qe),Be.setAttribute("aFase",new In(Qe,1)),Be.instanceCount=Ae;let ft=new Vn({side:Gt,vertexColors:!1});ft.onBeforeCompile=I=>{I.uniforms.uTime=Le.uTime,I.vertexShader=I.vertexShader.replace("#include <common>",`#include <common>
attribute float aAsa; attribute float aFase; uniform float uTime;`).replace("#include <begin_vertex>",`vec3 transformed = vec3(position); float bate = abs(sin(uTime * 17.0 + aFase * 30.0));
        transformed.y += aAsa * abs(position.x) * (bate * 2.4 - 0.4);`)};let et=new Sn(Be,ft,Ae);et.frustumCulled=!1,s.add(et);let It=[16757575,16248938,15921906,8038399,16743080,16752970],ot=[];for(let I=0;I<Ae;I++){let q=new ue($t.x+(r()-.5)*120,$t.z-10+(r()-.5)*70);et.setColorAt(I,new fe(It[Math.floor(r()*It.length)])),ot.push({p:new P(q.x,1,q.y),c:q,f:r()*6.28,yaw:0})}function ln(I,q){for(let R=0;R<Ae;R++){let Z=ot[R];Z.f+=I;let U=Z.c.x+Math.sin(Z.f*.6+R)*6+Math.sin(Z.f*1.7+R*2)*1.5,C=Z.c.y+Math.cos(Z.f*.5+R*1.3)*6+Math.cos(Z.f*1.9)*1.5,W=e.h(U,C)+.9+.5*Math.sin(Z.f*2.3+R)+.35*Math.sin(Z.f*5.1);Z.p.set(U+Le.uWindDir.value.x*Ke.ventoSuave*2.5,Math.max(W,e.h(U,C)+.3),C+Le.uWindDir.value.y*Ke.ventoSuave*2.5),Z.yaw=Math.atan2(Math.cos(Z.f*.6+R),Math.sin(Z.f*.5+R*1.3)),Q.compose(Z.p,new vt().setFromEuler(new tn(.3*Math.sin(Z.f*3),Z.yaw,.2*Math.sin(Z.f*2))),new P(1.2,1.2,1.2)),et.setMatrixAt(R,Q)}et.instanceMatrix.needsUpdate=!0,et.instanceColor&&(et.instanceColor.needsUpdate=!0)}let ct=140,wt=new Float32Array(ct*3),Wt=new Float32Array(ct);for(let I=0;I<ct;I++){let q=r()*6.28,R=20+r()*90;wt[I*3]=$t.x+Math.cos(q)*R*1.3,wt[I*3+2]=$t.z-30+Math.sin(q)*R*.7,wt[I*3+1]=.5+r()*2.5,Wt[I]=r()*6.28}let Rt=new je;Rt.setAttribute("position",new Tt(wt,3)),Rt.setAttribute("aFase",new Tt(Wt,1));let X=new mt({transparent:!0,depthWrite:!1,blending:kn,uniforms:{uTime:Le.uTime,uNoite:{value:0},uPx:{value:1}},vertexShader:`attribute float aFase; uniform float uTime; uniform float uPx; varying float vA;
      void main(){ vec3 p = position; p.x += sin(uTime*0.4+aFase*5.0)*2.5; p.z += cos(uTime*0.33+aFase*3.0)*2.5; p.y += sin(uTime*0.7+aFase*7.0)*0.8;
        vec4 mv = modelViewMatrix*vec4(p,1.0); gl_Position = projectionMatrix*mv; float pisca = pow(0.5+0.5*sin(uTime*2.2+aFase*11.0), 3.0);
        gl_PointSize = (3.0 + 8.0*pisca) * uPx * (60.0 / max(20.0, -mv.z)); vA = pisca; }`,fragmentShader:"uniform float uNoite; varying float vA; void main(){ float r = length(gl_PointCoord-0.5); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(0.75,1.0,0.35, a*a*vA*uNoite); }"}),Mt=new Si(Rt,X);Mt.frustumCulled=!1,s.add(Mt);let nt=520,it=new Float32Array(nt*3),ce=new Float32Array(nt);for(let I=0;I<nt;I++)it[I*3]=(r()-.5)*80,it[I*3+1]=r()*28,it[I*3+2]=(r()-.5)*80,ce[I]=r();let ut=new je;ut.setAttribute("position",new Tt(it,3)),ut.setAttribute("aSeed",new Tt(ce,1));let Re=new mt({transparent:!0,depthWrite:!1,blending:kn,uniforms:{uTime:Le.uTime,uWindDir:Le.uWindDir,uWind:Le.uWind,uWindMs:Le.uWindMs,uCam:Le.uCam,uDia:{value:1},uPx:{value:1}},vertexShader:`attribute float aSeed; uniform float uTime; uniform vec2 uWindDir; uniform float uWind; uniform float uWindMs; uniform vec3 uCam; uniform float uPx; varying float vA;
      void main(){ vec3 p = position; float v = (0.6 + uWindMs*0.7) * (0.6 + aSeed*0.8);
        p.xz += uWindDir * uTime * v; p.y += sin(uTime*0.9 + aSeed*20.0)*0.6 + sin(uTime*0.4+p.x*0.2)*0.3;
        vec3 w = vec3(40.0); vec3 rel = mod(p - uCam + w, 2.0*w) - w; vec3 wp = uCam + rel; wp.y = uCam.y + mod(p.y, 26.0) - 8.0;
        vec4 mv = viewMatrix * vec4(wp, 1.0); gl_Position = projectionMatrix * mv;
        float d = length(rel); vA = (1.0 - smoothstep(18.0, 40.0, d)) * (0.35 + 0.65*aSeed); gl_PointSize = (2.0 + 3.0*aSeed) * uPx; }`,fragmentShader:"uniform float uDia; uniform float uWind; varying float vA; void main(){ float r = length(gl_PointCoord-0.5); float a = smoothstep(0.5, 0.1, r); gl_FragColor = vec4(1.0, 0.95, 0.8, a*vA*0.45*uDia*(0.4+uWind)); }"}),De=new Si(ut,Re);De.frustumCulled=!1,s.add(De);function L(I,q,R,Z){f(I,q),g(I,q),w(I,q),B(I,q),Me(I,q),yt(I,q),ln(I,q),X.uniforms.uNoite.value=R,Re.uniforms.uDia.value=Z,et.visible=Z>.25}function M(I){X.uniforms.uPx.value=I,Re.uniforms.uPx.value=I}return{grupo:s,atualizar:L,definirPixel:M,bando:ee,vagalumes:Mt,poeira:De,aguia:Fe,borboletas:et,rebanho:c,coelhos:v,aves:m,peixes:b,ligarOndulacoes(I){y.fn=I},ocultosNoReflexo:[Mt,De]}}var Us=18,Fr=11.25,xd={vert:"varying vec2 vUv; varying float vProf; void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.0); vProf = -mv.z; gl_Position = projectionMatrix*mv; }",frag:`
    uniform sampler2D uMapa; uniform float uBrilho; uniform float uTime; uniform float uNoite;
    uniform float uAscii; uniform float uBoost; uniform sampler2D uProf; uniform vec2 uRes; uniform float uNear; uniform float uFar;
    varying vec2 vUv; varying float vProf;
    float linear(float d){ float z = d*2.0-1.0; return 2.0*uNear*uFar/(uFar+uNear - z*(uFar-uNear)); }
    void main(){
      vec3 c = texture2D(uMapa, vUv).rgb;
      float varre = smoothstep(0.0, 0.04, abs(fract(vUv.y*1.0 - uTime*0.35) - 0.5) - 0.46) * uBrilho * 0.0;
      c *= 1.0 + uBrilho*0.22 + uBoost*0.9;
      vec2 b = abs(vUv-0.5)*2.0; float vig = 1.0 - 0.18*pow(max(b.x,b.y), 3.0);
      c *= vig;
      c += vec3(0.01,0.02,0.04)*uNoite;
      gl_FragColor = vec4(c + varre, 1.0);
      #include <colorspace_fragment>
    }`};function Vx(i,e,t){let n=document.createElement("canvas");n.width=1024,n.height=140;let s=n.getContext("2d");s.fillStyle="rgba(8,12,24,0.88)",s.beginPath(),s.roundRect(4,4,1016,132,26),s.fill(),s.strokeStyle=t,s.lineWidth=4,s.beginPath(),s.roundRect(4,4,1016,132,26),s.stroke(),s.fillStyle="#f4f7ff",s.font='700 58px "Space Grotesk", Inter, system-ui, sans-serif',s.textBaseline="middle",s.fillText(i.length>22?i.slice(0,21)+"\u2026":i,36,56),s.fillStyle=t,s.font='600 34px "JetBrains Mono", ui-monospace, monospace',s.fillText(e.toUpperCase(),36,106);let r=new gn(n);return r.colorSpace=Et,r.anisotropy=4,r}function Gx(i){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createRadialGradient(64,64,6,64,64,64),s=`${Math.round(i.r*255)},${Math.round(i.g*255)},${Math.round(i.b*255)}`;return n.addColorStop(0,`rgba(${s},0.55)`),n.addColorStop(.5,`rgba(${s},0.16)`),n.addColorStop(1,`rgba(${s},0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new gn(e)}function vd(i,e,t){let n=new dt,s=[],r={uTime:Le.uTime,uNoite:{value:0},uAscii:{value:0},uProf:{value:null},uRes:{value:new ue(1,1)},uNear:{value:.3},uFar:{value:9e3}},o=e.length,a=$t.x,l=$t.z-58,c=30,u=17;e.forEach((h,f)=>{let v=Math.floor(f/2),g=f%2===0?-1:1,m=a+g*u,_=l-v*c,E=new P(m,Math.max(i.h(m,_),0)+10.5+v%2*3+(g>0?1.2:0),_),y=g<0?Math.PI/2-.5:-Math.PI/2+.5,w=new dt;w.position.copy(E),w.rotation.y=y;let T=new fe(h.cor),x=new Yt;x.colorSpace=Et,x.anisotropy=8;let b=new Image;b.onload=()=>{x.image=b,x.needsUpdate=!0},b.src=t[h.imagem]??"";let F=new mt({uniforms:{...r,uMapa:{value:x},uBrilho:{value:0},uBoost:{value:0}},vertexShader:xd.vert,fragmentShader:xd.frag,toneMapped:!1,side:Gn}),D=new We(new Tn(Us,Fr),F);D.position.z=.36,D.userData.quadroIdx=f,w.add(D);let O=new We(new Dn(Us+1.1,Fr+1.1,.7),new Vt({color:791078,metalness:.7,roughness:.32}));w.add(O);let B=new We(new Dn(Us+1.5,Fr+1.5,.3),new Vt({color:T,emissive:T,emissiveIntensity:1.6,roughness:.4}));B.position.z=-.12,w.add(B);let z=new We(new Tn(Us*.62,Us*.62*140/1024),new Vn({map:Vx(h.titulo,h.tag,h.cor),transparent:!0,toneMapped:!1}));z.position.set(0,-Fr/2-1.9,.4),z.userData.quadroIdx=f,w.add(z);let A=new Ui(new Mi({map:Gx(T),blending:kn,depthWrite:!1,transparent:!0,toneMapped:!1,fog:!1}));A.scale.set(Us*2.2,Fr*2.3,1),A.position.z=-1.2,w.add(A),w.traverse(k=>k.layers.set(2)),A.layers.set(1),n.add(w),s.push({projeto:h,grupo:w,tela:D,base:E,yaw:y,fase:f*1.7,brilho:0,alvoBrilho:0,indice:f,luz:A,posicaoVisita(k=25){let V=new P(Math.sin(y),0,Math.cos(y)),H=E.clone().addScaledVector(V,k);return H.y=E.y-1.5,{pos:H,alvo:E.clone()}}})});let p=s.map(h=>h.tela);function d(h,f){r.uNoite.value=f;let v=Ke.ventoSuave;for(let g of s){let m=Math.sin(h*.55+g.fase)*(.35+v*.7)+Math.sin(h*1.3+g.fase*2)*.1*v;g.grupo.position.set(g.base.x,g.base.y+m,g.base.z),g.grupo.rotation.y=g.yaw+Math.sin(h*.4+g.fase)*(.012+.05*v)+Le.uWindDir.value.x*0,g.grupo.rotation.z=Math.sin(h*.7+g.fase*1.3)*(.004+.02*v),g.grupo.rotation.x=Math.sin(h*.5+g.fase)*(.003+.012*v),g.brilho+=(g.alvoBrilho-g.brilho)*.14,g.tela.material.uniforms.uBrilho.value=g.brilho;let _=1+g.brilho*.035;g.grupo.scale.setScalar(_),g.luz.material.opacity=.6+.4*f+g.brilho*.5}}return{grupo:n,quadros:s,alvos:p,atualizar:d,unif:r}}async function yd(){let i=window.__MUNDO_FONTE;try{if(i){let e=new FontFace("JetBrains Mono",`url(${i})`,{weight:"700"});await e.load(),document.fonts.add(e)}await document.fonts.load('700 24px "JetBrains Mono"')}catch{}}var kx=" .,'`^\":;-_~=+*!?|/\\()[]{}<>1ilIjtfrxnuvczsaeoXYUJCLQ0OZmwqpdbkhgyTVAEFGHKNPRSDBMW&#%@$8",Qa=4;function _d(i,e,t=40){let n=document.createElement("canvas");n.width=i,n.height=e;let s=n.getContext("2d",{willReadFrequently:!0});s.font=`700 ${Math.round(e*.8)}px "JetBrains Mono", ui-monospace, Menlo, monospace`,s.textAlign="center",s.textBaseline="middle";let r=[...kx].map(d=>{s.clearRect(0,0,i,e),s.fillStyle="#fff",s.fillText(d,i/2,e/2+1);let h=s.getImageData(0,0,i,e).data,f=0;for(let v=3;v<h.length;v+=4)f+=h[v];return{ch:d,s:f}}).sort((d,h)=>d.s-h.s),o=r.length,a=document.createElement("canvas");a.width=i*t,a.height=e*Qa;let l=a.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,a.width,a.height),l.font=s.font,l.textAlign="center",l.textBaseline="middle",l.fillStyle="#fff";let c=Math.max(1,o/t*1.6),u=[];for(let d=0;d<t;d++){let h=d/(t-1)*(o-1);for(let f=0;f<Qa;f++){let v=Math.max(0,Math.min(o-1,Math.round(h+(f/(Qa-1)-.5)*c))),g=r[v].ch;f===1&&u.push(g),l.fillText(g,d*i+i/2,f*e+e/2+1)}}let p=new gn(a);return p.minFilter=At,p.magFilter=At,p.generateMipmaps=!1,p.colorSpace=Fn,{tex:p,n:t,letras:u.join("")}}var Wx="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Xx=`
precision highp float;
uniform sampler2D tCena; uniform sampler2D tProf; uniform sampler2D tAtlas; uniform vec2 uRes; uniform vec2 uCel; uniform float uN; uniform float uVar; uniform float uExp; uniform float uTime; uniform float uNoite;
varying vec2 vUv;
vec3 aces(vec3 x){ const float a=2.51, b=0.03, c=2.43, d=0.59, e=0.14; return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0); }
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
void main(){
  vec2 px = floor(vUv * uRes);
  vec2 cel = floor(px / uCel);
  vec2 dentro = (px - cel * uCel + 0.5) / uCel;
  vec2 cuv = (cel + 0.5) * uCel / uRes;
  vec2 o = uCel / uRes * 0.28;
  vec3 c = texture2D(tCena, cuv).rgb * 0.4
         + texture2D(tCena, cuv + vec2( o.x,  o.y)).rgb * 0.15 + texture2D(tCena, cuv + vec2(-o.x,  o.y)).rgb * 0.15
         + texture2D(tCena, cuv + vec2( o.x, -o.y)).rgb * 0.15 + texture2D(tCena, cuv + vec2(-o.x, -o.y)).rgb * 0.15;
  float ceuF = step(0.99995, texture2D(tProf, cuv).x);
  c *= mix(1.0, 0.3, ceuF * (1.0 - uNoite));
  vec3 col = pow(aces(c * uExp * (1.0 + 3.0 * uNoite)), vec3(1.0/2.2));
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  // nitidez local: real\xE7a contornos para a forma das coisas aparecer
  vec2 o2 = uCel / uRes * 1.6;
  vec3 b4 = texture2D(tCena, cuv + vec2(o2.x, 0.0)).rgb + texture2D(tCena, cuv - vec2(o2.x, 0.0)).rgb + texture2D(tCena, cuv + vec2(0.0, o2.y)).rgb + texture2D(tCena, cuv - vec2(0.0, o2.y)).rgb;
  float lumB = dot(pow(aces(b4 * 0.25 * uExp * (1.0 + 3.0 * uNoite)), vec3(1.0/2.2)), vec3(0.299, 0.587, 0.114));
  float l = clamp(pow(clamp(lum, 0.0, 1.0), 1.5) * 1.1 * mix(1.0, 0.7, ceuF) + (lum - lumB) * 1.4, 0.0, 0.999);
  float g = floor(l * uN);
  float vr = floor(hash(cel * 1.37 + 7.1) * uVar);
  float cov = texture2D(tAtlas, vec2((g + dentro.x) / uN, (vr + dentro.y) / uVar)).r;
  // cor fiel: nada de tingir tudo de uma cor s\xF3
  float m = dot(col, vec3(0.333));
  vec3 cor = clamp(m + (col - m) * 1.25, 0.0, 1.0);
  vec3 gc = min(cor * (0.85 + 0.55 * lum), vec3(1.0));
  vec3 bg = cor * 0.2;
  gl_FragColor = vec4(mix(bg, gc, cov), 1.0);
}`;function Md(i,e){let t=_d(8,14),n=new Zt(64,64,{type:Jt,depthBuffer:!0,samples:0});n.depthTexture=new Ln(64,64),n.texture.minFilter=bt,n.texture.magFilter=bt,n.texture.generateMipmaps=!1;let s=new mt({uniforms:{tCena:{value:n.texture},tProf:{value:n.depthTexture},tAtlas:{value:t.tex},uRes:{value:new ue(1,1)},uCel:{value:new ue(9,16)},uN:{value:t.n},uVar:{value:Qa},uExp:{value:.55},uTime:Le.uTime,uNoite:{value:0}},vertexShader:Wx,fragmentShader:Xx,depthTest:!1,depthWrite:!1,toneMapped:!1}),r=new We(new Tn(2,2),s);r.frustumCulled=!1;let o=new _i;o.add(r);let a=new oi(-1,1,1,-1,0,1),l=e,c=8,u={colunas:0,linhas:0};function p(){let f=new ue;i.getDrawingBufferSize(f);let v=i.getPixelRatio(),g=Math.max(3,Math.round(l*v)),m=Math.round(g*1.75);g!==c&&(c=g,t.tex.dispose(),t=_d(g,m),s.uniforms.tAtlas.value=t.tex),s.uniforms.uRes.value.copy(f),s.uniforms.uCel.value.set(g,m);let _=Math.max(32,Math.round(f.x/g*3)),E=Math.max(32,Math.round(f.y/m*3));(n.width!==_||n.height!==E)&&n.setSize(_,E),u.colunas=Math.floor(f.x/g),u.linhas=Math.floor(f.y/m)}function d(f){l=f,p()}function h(){i.render(o,a)}return{rt:n,mat:s,ajustar:p,desenhar:h,definirCelula:d,info:u,letras:t.letras,get celula(){return l}}}var Yi=i=>i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),an=(i,e,t,n)=>{let s=document.createElement(i);return e&&(s.id=e),t&&(s.className=t),n!==void 0&&(s.innerHTML=n),s};function bd(i,e,t){let n=an("div","hud","",'<b>VIBE CODING PROCESS</b><span id="hud1">carregando\u2026</span>'),s=an("div","dock"),r=(H,ee,Y,Q)=>{let ne=an("button",Q,"bt vidro "+ee,H);return ne.onclick=_e=>{_e.stopPropagation(),Y()},s.appendChild(ne),ne},o=r("\u25A6 ASCII","on",t.modo,"bmodo"),a=r("\u2708 Voar","",t.voar,"bvoo"),l=r("\u25B6 Tour","",t.tour,"btour"),c=r("\u25A4 Quadros","",()=>b(h),"blista"),u=r("\u263C Ajustes","",()=>b(f),"baj"),p=r("</> C\xF3digo","",t.codigo,"bcod"),d=window.__MUNDO_VOLTAR;if(d){let H=an("a","bvoltar","bt vidro","\u2190 Site VCP");H.href=d,s.prepend(H)}let h=an("div","lista","vidro");e.forEach((H,ee)=>{let Y=an("button",void 0,"",`<i style="background:${H.cor}"></i><span>${Yi(H.titulo)}<small>${Yi(H.tag)}</small></span>`);Y.onclick=()=>{h.classList.remove("on"),t.catalogo(ee)},h.appendChild(Y)});let f=an("div","ajustes","vidro",`
    <label>HORA DO DIA \xB7 <span id="vh">08:12</span></label><input id="ih" type="range" min="0" max="24" step="0.05" value="10.6">
    <label>VENTO \xB7 <span id="vv">5 m/s</span></label><input id="iv" type="range" min="0" max="1" step="0.01" value="0.4">
    <label>TAMANHO DAS LETRAS (modo ASCII)</label><input id="il" type="range" min="3" max="10" step="1" value="5">
    <div class="lin"><button class="bt vidro" id="ba">\u27F3 Dia autom\xE1tico</button><button class="bt vidro" id="bn">\u263E Noite</button><button class="bt vidro" id="bp">\u2600 P\xF4r do sol</button></div>`),v=an("div","painel","vidro",""),g=an("div","dica","vidro","Arraste para olhar \xB7 WASD mover \xB7 Shift correr \xB7 F voar \xB7 M modo \xB7 clique nos quadros"),m=an("div","codigo","vidro",'<header id="cabc">arquivo</header><pre id="precod"></pre>'),_=an("div","visor","",'<div class="topo"><b id="vtit"></b><a class="bt vidro ac" id="vabrir" target="_blank" rel="noopener noreferrer">Abrir em nova aba \u2197</a><button class="bt vidro" id="vfechar">\u2715 Fechar</button></div><iframe id="vif" title="Projeto" referrerpolicy="no-referrer" loading="lazy"></iframe><small>Alguns sites bloqueiam exibi\xE7\xE3o dentro de outra p\xE1gina. Se ficar em branco, use \u201CAbrir em nova aba\u201D.</small>'),E=an("div","joy","","<i></i>"),y=an("div","alt","",""),w=an("button","bup","bt vidro","\u25B2"),T=an("button","bdn","bt vidro","\u25BC");y.append(w,T);let x=an("div","abertura","",'<b>VIBE CODING PROCESS</b><em id="ab1">gerando o mundo em c\xF3digo\u2026</em><div class="barra"><i id="abb"></i></div>');i.append(n,s,h,f,v,g,m,_,E,y,x);function b(H){let ee=!H.classList.contains("on");h.classList.remove("on"),f.classList.remove("on"),ee&&H.classList.add("on")}let F=H=>document.getElementById(H),D=H=>{let ee=(H%24+24)%24;return String(Math.floor(ee)).padStart(2,"0")+":"+String(Math.floor(ee%1*60)).padStart(2,"0")},O=F("ih"),B=F("iv"),z=F("il");O.oninput=()=>{t.autoHora(!1),t.hora(+O.value),F("vh").textContent=D(+O.value)},B.oninput=()=>t.vento(+B.value),z.oninput=()=>t.letras(+z.value),F("ba").onclick=()=>t.autoHora(!0),F("bn").onclick=()=>{t.autoHora(!1),O.value="23",O.oninput(new Event("input"))},F("bp").onclick=()=>{t.autoHora(!1),O.value="18.1",O.oninput(new Event("input"))},F("vfechar").onclick=()=>{_.classList.remove("on"),F("vif").src="about:blank"};let A=null;function k(H,ee){A=H;let Y=H.url?`<a class="bt ac" href="${Yi(H.url)}" target="_blank" rel="noopener noreferrer">Abrir projeto \u2197</a><button class="bt vidro" id="pver">Ver aqui</button>`:'<span class="bt vidro" style="cursor:default">Projeto em prepara\xE7\xE3o</span>';v.innerHTML=`<button class="x" aria-label="Fechar">\xD7</button><div class="tg" style="color:${H.cor}">${Yi(H.tag)}</div><h2>${Yi(H.titulo)}</h2><p>${Yi(H.descricao)}</p><div class="ln">${Y}<button class="bt vidro" id="pvoar">Voar at\xE9 aqui</button></div>`,v.classList.add("on"),v.querySelector(".x").onclick=t.fechar,v.querySelector("#pvoar").onclick=()=>t.sobrevoar(ee);let Q=v.querySelector("#pver");Q&&H.url&&(Q.onclick=()=>{F("vtit").textContent=H.titulo,F("vabrir").href=H.url,F("vif").src=H.url,_.classList.add("on")})}function V(){v.classList.remove("on"),A=null}return{hud1:F("hud1"),bModo:o,bVoo:a,bTour:l,bCod:p,bLista:c,bAj:u,abrirPainel:k,fecharPainel:V,painel:v,dica:g,codigo:m,joy:E,alt:y,bUp:w,bDn:T,abertura:x,il:z,ih:O,iv:B,lista:h,ajustes:f,get atual(){return A},hh:D,cabc:F("cabc"),precod:F("precod"),progresso(H,ee){F("ab1").textContent=H,F("abb").style.width=Math.round(ee*100)+"%"},fecharMenus(){h.classList.remove("on"),f.classList.remove("on")},visorAberto(){return _.classList.contains("on")},fecharVisor(){F("vfechar").click()},sincHora(H){O.value=String((H%24+24)%24),F("vh").textContent=D(H)},sincVento(H){F("vv").textContent=H.toFixed(1)+" m/s"}}}function Sd(i,e=1){let t=/\b(const|let|function|return|if|else|for|of|export|import|from|new|type|as|while|switch|case|break|continue|void|number|boolean|string)\b/g;return i.map((n,s)=>{let r=Yi(n),o=r.indexOf("//"),a="";return o>=0&&(a=`<span class="c">${r.slice(o)}</span>`,r=r.slice(0,o)),r=r.replace(/(&#39;[^&]*&#39;|'[^']*'|`[^`]*`)/g,'<span class="s">$1</span>').replace(t,'<span class="k">$1</span>').replace(/\b(\d+\.?\d*)\b/g,'<span class="n">$1</span>'),`<span class="g">${String(s+e).padStart(3," ")}  </span>${r}${a}`}).join(`
`)}var wd=qh(),fn=Yh(wd),Ed=Pr.get("teste")==="1",Td=document.getElementById("app"),Zi=(i=0)=>new Promise(e=>requestAnimationFrame(()=>setTimeout(e,i))),el=(window.__MUNDO_PROJETOS??[]).filter(i=>i.mostrar!==!1);Pr.get("clientes")==="0"&&(el=el.filter(i=>!i.cliente));var qx=window.__MUNDO_IMAGENS??{};async function Yx(){let i=document.createElement("canvas");i.id="mundo",Td.appendChild(i);let e=bd(Td,el,Zx);e.progresso("carregando fonte e letras\u2026",.05),await Zi(),await yd();let t=new Xa({canvas:i,antialias:wd!=="baixa",powerPreference:"high-performance",preserveDrawingBuffer:Ed});t.toneMapping=vr,t.outputColorSpace=Et,t.autoClear=!0;let n=new _i,s=new qt(62,1,.3,9e3);s.rotation.order="YXZ",e.progresso("modelando terreno, lago e montanhas\u2026",.15),await Zi();let r=jh(fn.segTerreno),o=Qh(r);n.add(o.interno,o.externo);let a=ed(n,t,fn.nuvens),l=id(n,t,r,fn.reflexo);e.progresso("plantando \xE1rvores\u2026",.4),await Zi();let c=ld(r,fn.arvores,fn.sombra>0);n.add(c.grupo),e.progresso("espalhando capim, flores e pedras\u2026",.6),await Zi();let u=cd(r,fn.capim,fn.flores),p=ud(r,fn.pedras,fn.sombra>0),d=hd(r,fn.juncos);n.add(u.grupo,p.grupo,d.malha),l.ocultarNoReflexo(u.grupo),e.progresso("criando os animais\u2026",.8),await Zi();let h=gd(n,r,s,fn.sombra>0);h.ligarOndulacoes((U,C,W)=>l.ondular(U,C,W)),h.ocultosNoReflexo.forEach(U=>l.ocultarNoReflexo(U)),e.progresso("pendurando os quadros\u2026",.92),await Zi();let f=vd(r,el,qx);n.add(f.grupo);let v=Pr.get("modo")!=="real",m=Md(t,Ls?4:5),_=fn.pixel,E=()=>v?Math.min(devicePixelRatio||1,2):_,y=new We(new Tn(2,2),new mt({uniforms:{tProf:{value:m.rt.depthTexture}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"uniform sampler2D tProf; varying vec2 vUv; void main(){ gl_FragColor = vec4(0.0); gl_FragDepth = texture2D(tProf, vUv).x; }",colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:ps}));y.frustumCulled=!1;let w=new _i;w.add(y);let T=new oi(-1,1,1,-1,0,1);function x(){let U=innerWidth,C=innerHeight;t.setPixelRatio(E()),t.setSize(U,C,!1),i.style.width="100%",i.style.height="100%",s.aspect=U/C,s.updateProjectionMatrix(),m.ajustar(),v?l.definirBase(m.rt.width,m.rt.height):l.definirBase(0,0),h.definirPixel(E())}addEventListener("resize",x),x();let b=0,F=.12,D=!1,O=new P($t.x,r.h($t.x,$t.z)+1.7,$t.z),B=new Set,z={x:0,y:0},A=0,k=!0,V=null,H=-1,ee=-1,Y=0;function Q(U,C){let W=U.clone().sub(C);return{yaw:Math.atan2(-W.x,-W.z),pitch:Math.atan2(W.y,Math.hypot(W.x,W.z))}}let ne=(U,C)=>{let W=(C-U)%(Math.PI*2);return W>Math.PI&&(W-=Math.PI*2),W<-Math.PI&&(W+=Math.PI*2),W};function _e(U,C,W,se){let N=Q(C,U);V={de:O.clone(),para:U.clone(),yawDe:b,yawPara:b+ne(b,N.yaw),pDe:F,pPara:N.pitch,t:0,dur:W,fim:se},k=!1}function we(U,C=!0){let W=f.quadros[U];if(!W)return;H=U,Me(),D||ie(!0);let se=Math.tan(s.fov/2*Math.PI/180)*s.aspect,N=W.posicaoVisita(Math.max(26,18*.62/se));_e(N.pos,N.alvo,2.6,()=>{C&&e.abrirPainel(W.projeto,U)}),C&&e.abrirPainel(W.projeto,U)}function ie(U){D=U??!D,e.bVoo.classList.toggle("on",D),e.bVoo.textContent=D?"\u2302 Andar":"\u2708 Voar",e.alt.classList.toggle("on",D&&Ls)}function pe(){v=!v,e.bModo.classList.toggle("on",v),e.bModo.textContent=v?"\u25A6 ASCII":"\u25C9 Realista",x()}function Me(){f.quadros.forEach((U,C)=>U.tela.layers.set(2))}function Pe(){e.fecharPainel(),e.fecharMenus(),H=-1,Me(),e.visorAberto()&&e.fecharVisor()}function he(){if(ee>=0){ee=-1,e.bTour.classList.remove("on"),e.bTour.textContent="\u25B6 Tour";return}ee=0,Y=0,e.bTour.classList.add("on"),e.bTour.textContent="\u25A0 Parar",we(0,!0)}let Fe=!1;function yt(){e.codigo.classList.toggle("on"),e.bCod.classList.toggle("on",e.codigo.classList.contains("on"))}Object.assign(Ad,{modo:pe,voar:()=>ie(),tour:he,codigo:yt,catalogo:U=>we(U),sobrevoar:U=>we(U,!1),hora:U=>{Ke.hora=U},vento:U=>{Ke.vento=U},letras:U=>m.definirCelula(U),autoHora:U=>{Fe=U},fechar:Pe}),e.bModo.classList.toggle("on",v),e.bModo.textContent=v?"\u25A6 ASCII":"\u25C9 Realista",!Ls&&innerWidth>1e3&&(e.codigo.classList.add("on"),e.bCod.classList.add("on")),Ls&&(e.dica.textContent="Arraste para olhar \xB7 joystick \xE0 esquerda para andar \xB7 toque nos quadros");let Ae=new gr;Ae.layers.enable(1),Ae.layers.enable(2);let qe=new ue;function Qe(U,C){qe.set(U/innerWidth*2-1,-(C/innerHeight)*2+1),Ae.setFromCamera(qe,s);let W=Ae.intersectObjects(f.grupo.children,!0).find(se=>se.object.userData.quadroIdx!==void 0);return W?W.object.userData.quadroIdx:-1}function Be(){k=!1,V&&(V=null),ee>=0&&he()}let ft=new Map,et={x:0,y:0};i.addEventListener("pointerdown",U=>{i.setPointerCapture(U.pointerId);let W=U.pointerType!=="mouse"&&U.clientX<innerWidth*.4&&!It("joy")?"joy":"olhar";ft.set(U.pointerId,{x:U.clientX,y:U.clientY,x0:U.clientX,y0:U.clientY,t0:performance.now(),tipo:W,mov:0}),W==="joy"&&(et={x:U.clientX,y:U.clientY},e.joy.style.display="block",e.joy.style.left=U.clientX+"px",e.joy.style.top=U.clientY+"px"),e.fecharMenus()});let It=U=>[...ft.values()].some(C=>C.tipo===U);i.addEventListener("pointermove",U=>{let C=ft.get(U.pointerId);if(!C){if(U.pointerType==="mouse"){let N=Qe(U.clientX,U.clientY);f.quadros.forEach((K,j)=>K.alvoBrilho=j===N?1:0),i.style.cursor=N>=0?"pointer":"grab"}return}let W=U.clientX-C.x,se=U.clientY-C.y;if(C.x=U.clientX,C.y=U.clientY,C.mov+=Math.abs(W)+Math.abs(se),C.tipo==="joy"){let N=U.clientX-et.x,K=U.clientY-et.y,j=Math.min(1,Math.hypot(N,K)/50),oe=Math.atan2(K,N);z.x=Math.cos(oe)*j,z.y=Math.sin(oe)*j,e.joy.firstElementChild.style.transform=`translate(${Math.cos(oe)*j*40}px,${Math.sin(oe)*j*40}px)`}else if(C.mov>3){Be();let N=U.pointerType==="mouse"?.0042:.0055;b-=W*N,F=Math.max(-1.3,Math.min(1.3,F-se*N)),i.style.cursor="grabbing"}});let ot=U=>{let C=ft.get(U.pointerId);if(C){if(ft.delete(U.pointerId),C.tipo==="joy"){z.x=z.y=0,e.joy.style.display="none",e.joy.firstElementChild.style.transform="";return}if(i.style.cursor="grab",C.mov<8&&performance.now()-C.t0<500&&U.type==="pointerup"){let W=Qe(U.clientX,U.clientY);W>=0?we(W):Pe()}}};i.addEventListener("pointerup",ot),i.addEventListener("pointercancel",ot),i.addEventListener("wheel",U=>{U.preventDefault(),Be();let C=new P(-Math.sin(b),0,-Math.cos(b));O.addScaledVector(C,-U.deltaY*.04)},{passive:!1}),i.style.cursor="grab",addEventListener("keydown",U=>{if(U.target?.tagName==="INPUT")return;let C=U.key.toLowerCase();if(C==="escape"){Pe();return}C==="m"?pe():C==="f"?ie():C==="t"?he():["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","shift"," ","q","e","c"].includes(C)&&(B.add(C),Be(),U.preventDefault())}),addEventListener("keyup",U=>B.delete(U.key.toLowerCase())),addEventListener("blur",()=>B.clear());let ln=(U,C)=>{U.addEventListener("pointerdown",W=>{W.stopPropagation(),A=C,Be()}),U.addEventListener("pointerup",()=>A=0),U.addEventListener("pointerleave",()=>A=0)};ln(e.bUp,1),ln(e.bDn,-1);let ct=new P,wt=new P;function Wt(U){if(V){V.t+=U/V.dur;let ye=Math.min(1,V.t),Ne=ye*ye*(3-2*ye);if(O.lerpVectors(V.de,V.para,Ne),O.y+=Math.sin(Ne*Math.PI)*6,b=V.yawDe+(V.yawPara-V.yawDe)*Ne,F=V.pDe+(V.pPara-V.pDe)*Ne,ye>=1){let re=V.fim;V=null,re?.()}return}let C=(B.has("w")||B.has("arrowup")?1:0)-(B.has("s")||B.has("arrowdown")?1:0)-z.y,W=(B.has("d")||B.has("arrowright")?1:0)-(B.has("a")||B.has("arrowleft")?1:0)+z.x,se=Math.hypot(C,W);se>1&&(C/=se,W/=se);let N=B.has("shift")||Math.hypot(z.x,z.y)>.92,K=D?N?60:18:N?12:5;D?ct.set(-Math.sin(b)*Math.cos(F),Math.sin(F),-Math.cos(b)*Math.cos(F)):ct.set(-Math.sin(b),0,-Math.cos(b)),wt.set(Math.cos(b),0,-Math.sin(b));let j=O.x+(ct.x*C+wt.x*W)*K*U,oe=O.z+(ct.z*C+wt.z*W)*K*U,ae=O.y+ct.y*C*K*U,le=660;if((D||r.h(j,oe)>-1.3)&&(O.x=Math.max(-le,Math.min(le,j)),O.z=Math.max(-le,Math.min(le,oe))),D){let ye=(B.has(" ")||B.has("e")?1:0)-(B.has("q")||B.has("c")?1:0)+A;O.y=ae+ye*K*.6*U,O.y=Math.max(Math.max(r.h(O.x,O.z),0)+1.3,Math.min(150,O.y))}else{let ye=Math.max(r.h(O.x,O.z),0)+1.7+Math.sin(Ke.tempo*7)*.025*Math.min(1,Math.hypot(C,W));O.y+=(ye-O.y)*Math.min(1,U*10)}}let Rt=window.__MUNDO_CODIGO??[],X=0,Mt=0,nt=0;function it(U){if(!e.codigo.classList.contains("on")||!Rt.length)return;let C=Rt[X];Mt<C.texto.length?Mt=Math.min(C.texto.length,Mt+U*160):(nt+=U,nt>3.2&&(nt=0,Mt=0,X=(X+1)%Rt.length));let W=C.texto.slice(0,Math.floor(Mt)).split(`
`),N=Math.max(0,W.length-17);e.cabc.textContent=C.arquivo,e.precod.innerHTML=Sd(W.slice(N),N+1)+(Mt<C.texto.length?'<span style="opacity:.8">\u258C</span>':"")}let ce=0,ut=0,Re=60,De=0,L=0,M=0,I=new fe;function q(U){Zh(U),Fe&&(Ke.hora+=U/18,e.sincHora(Ke.hora)),Wt(U),k&&!V&&(b=Math.sin(Ke.tempo*.08)*.22,F=.12+Math.sin(Ke.tempo*.13)*.03),s.position.copy(O),s.rotation.set(F,b,0),s.updateMatrixWorld(),Le.uCam.value.copy(s.position),a.atualizar(s.position),td(Ke.ventoSuave,Ke.angulo);let C=Math.max(.12,Math.min(1,a.direcao.y*2.2+.25)),W=Math.max(0,Math.min(1,-a.direcao.y*4+.1));if(l.atualizar(s,a.sol,a.hemi.color,C,n.fog,Ke.tempo),h.atualizar(U,Ke.tempo,W,C),f.atualizar(Ke.tempo,W),f.quadros.forEach((se,N)=>se.tela.material.uniforms.uBoost.value=0),ee>=0&&!V&&(Y+=U,Y>5.5&&(Y=0,ee=(ee+1)%f.quadros.length,we(ee,!0))),it(U),m.mat.uniforms.uNoite.value=W,s.layers.enableAll(),l.renderReflexo(s,n),v?(s.layers.set(0),s.layers.enable(1),t.setRenderTarget(m.rt),t.clear(),t.render(n,s),t.setRenderTarget(null),t.autoClear=!1,t.clear(),m.desenhar(),t.render(w,T),s.layers.set(2),t.render(n,s),s.layers.enableAll(),t.autoClear=!0):(s.layers.enableAll(),t.render(n,s)),ce+=U,ut++,ce>1&&(Re=ut/ce,ce=0,ut=0,Re<24?(L++,M=0):Re>52?(M++,L=0):L=M=0,v||(L>=2&&_>.6?(_=Math.max(.6,_-.15),L=0,x()):M>=8&&_<fn.pixel&&(_=Math.min(fn.pixel,_+.1),M=0,x()))),De+=U,De>.25){De=0;let se=v?m.info.colunas*m.info.linhas:0;e.hud1.textContent=`vento ${Le.uWindMs.value.toFixed(1)} m/s   hora ${e.hh(Ke.hora)}   ${v?"letras "+se:"modo realista"}   ${Math.round(Re)} fps`,e.sincVento(Le.uWindMs.value)}}let R=performance.now();function Z(){let U=performance.now(),C=Math.min(.1,(U-R)/1e3);R=U,q(C),requestAnimationFrame(Z)}window.__vcp={fauna:h,capim:u,pedras:p,juncos:d,floresta:c,agua:l,camera:s,scene:n,renderer:t,campo:r,mundo:Ke,quadros:f,ascii:m,ver(U,C,W,se,N){k=!1,V=null,O.set(U,C,W),b=se,F=N},passo(U=1,C=.05){for(let W=0;W<U;W++)q(C)},modo(U){U!==v&&pe()},visitar:we,ui:e},e.progresso("pronto",1),q(.016),q(.016),await Zi(250),e.abertura.classList.add("fim"),setTimeout(()=>e.abertura.remove(),1e3),setTimeout(()=>e.dica.style.opacity="0",14e3),Ed||requestAnimationFrame(Z)}var Ad={},Zx=new Proxy(Ad,{get:(i,e)=>(...t)=>i[e]?.(...t)});Yx().catch(i=>{console.error(i);let e=document.createElement("div");e.style.cssText="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#fff;font:15px Inter,sans-serif;background:#0b1020;z-index:9",e.textContent="N\xE3o foi poss\xEDvel iniciar o mundo 3D neste aparelho (WebGL indispon\xEDvel?). Tente outro navegador.",document.body.appendChild(e)});})();
