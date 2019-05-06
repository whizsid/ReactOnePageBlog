# Passport භාවිතා කිරීම.

---

අපි කළින් පිටුවෙන් ඉගෙන ගත්තා passport install කරන හැටි. දැන් අපි බලමු passport කොහොමද භාවිතා කරන්නෙ කියල.

## User token එකක් හදාගමු.

passport භාවිතා කරද්දි අපි මුලිනම් ඒ ඒ user ට අදාළව token එකක් හදා ගෙන login එකේදි යවන්න ඕනෙ.

පාස්පෝට් වලදි අපි ඒ ඒ user ට අදාළව token එකක් (personal access token) හදා ගන්නෙ පල්ලෙහා code එක use කරල.

<WSCode language="php" code="
$token = $user-&gt;createToken('Token Name')-&gt;accessToken;
" />

දැන් අපි මුල ඉදන්ම පටන් ගමු. මම මුලින්ම usersController එක හදාගන්නව login කියල function එකකුත් එක්ක. අපේ project එක පිස්සිගේ පලා මල්ල වගේ පිළිවෙලක් නැති නිසා මම Rest API වලට පාව්චිචි කරන Controllers වෙනම namespace එකක හදාගන්නව. UserController එක හදා ගන්න මම දැන් command එක run කරනව.

<WSCode language="bash" code="
php artisan make:controller API/V1/UserController
"/>

මම API කියන folder එකේ තමයි සේරම REST API එකට අදාළ Controllers හදාගන්නෙ. V1 folder එකෙන් කියන්නෙ අපේ REST API එකේ version එක.
REST API කරද්දි versions පාවිච්චි කරන්න හේතුවක් තියෙනව. අපි හිතමු අපේ REST API එක කාගෙ හරි android app එකක නැත්තම් අපේම android app එකක හරි වේනත් software එකක පාවිච්චි කරනව.
අපිට ටික කාලයක් යද්දි හිතෙනව Web Service එකක URL එකක් වෙනස් කරන්න ඕන කියල. ඒත් අපි දැන් ඒක වෙනස් කරොත් පරණ app, softwares වල අපේ ඒ web service එක පාවිච්චි කරද්දි crash වෙනව.
ඒ හේතුව නිසා තමයි web services වලට version controling අත්‍යවශය වෙන්නෙ.

දැන් මම Exception එකක් create කරගන්නව අපේ REST API එකේ user එවන input වැරදුනම throw කරන්න.

<WSCode language="bash" code="
php artisan make:exception APIException
"/>

අපි දැන් අපේ UserController එක හදා ගමු login function එකකුත් එක්ක.

<WSCode language="php" code="
<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Exceptions\APIException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request){
		$validation = Validator::make($request-&gt;all(),[
			'username'=&gt;'required|exists:users,email',
			'password'=&gt;'required'
		]);

		if($validation-&gt;fails()){
			// <APIE1&gt; \\
			// මෙහෙම error code එක pattern එකකට comment කරේ කවද හරි අපිට user කෙනෙක් issue
			// එකක් submit කරොත් මේ error code එක return වෙනව කියල අපිට හොයාගන්න ලේසි වෙන නිසා
			throw new APIException($validation-&gt;errors()-&gt;first(),1);
		}

		// දැන් අපි login වෙන්න උත්සාහා කරනවා
		if(Auth::attempt([
			'email'=&gt;$request-&gt;username,
			'password'=&gt;$request-&gt;password
		])){
			// login වෙන්න පුළුවන් උනොත් login වෙච්ච userව ගන්නවා
			$user = Auth::user();

			return response()-&gt;json([
				'success'=&gt;true,
				'message'=&gt;'Successfully login!',
				// මෙතනදි අපි ඒ user ට token එකක් issue කරනව.
				// TSTApp වෙනුවට ඔයාලට කැමති නමක් දාගන්න පුළුවන්.
				'token'=&gt;$user-&gt;createToken('TSTApp')-&gt;accessToken
			]);
		} else {
			// <APIE2&gt; \\
			throw new APIException('Password Incorrect',2);
		}
	}
}

"/>

දැන් අපි අපේ login function එක route කරමු. එතකොට අපිට test කරන්නත් පුළුවන් අපේ login function එක. අපි route කරද්දිත් පිළිවෙලට api versions වලට වෙන වෙන route files හදාගන්න ඕන. එතකොට ඉස්සරහදි versions ගොඩක් එද්දි අපිට project එක එපා වෙන්නෙ නෑ. දැන් අපි v1 වලට route හදාගමු.
මුලින්ම ඔයාගේ `routes/api.php` file එක open කර ගන්න.

<WSCode language="php" code="
<?php

Route::group([
	// අපේ URL එක /api/v1 කියල පටන් ගනිද්දි
	'prefix'=&gt;'v1',
	// API\V1 කියන namespace එක use කරන්න කියල තමයි මේ code එකෙන් කියන්නෙ.
	'namespace'=&gt;'API\V1'
],function(){
	// ඒ වගේම ඊට අදාළ routes තියෙන්නෙත් api/v1.php කියන file එකේ.
	require_once('api/v1.php');
});

" />

දැන් අපි අලුතෙන් file එකක් හදා ගමු `routes/api/v1.php` කියල. මේ file එකේ තමයි අපි අපේ API එකේ version 1 එකට අදාළ routes හදාගන්නෙ.

<WSCode language="php" code="
<?php

Route::group(['prefix'=&gt;'user'],function(){
	// අපි UserController එක route කරද්දි API/V1/UserController කියල දෙන්න ඕන නෑ.
	// මොකද අපි ඒක මුලදිම define කරා api.php file එකේදි. 
	Route::post('login','UserController@login');
});
" />

දැන් අපි අපේ login function එක route කරල ඉවරයි. දැන් අපිට තියෙන්නේ test කරල බලන්න. මේකට අපිට ඕන වෙනව Rest Client එකක්.
මගෙනම් IDE එකේම තියනෙව Rest Client කියල extension එකක්. මම පාවිච්චි කරන්නෙ VS Code.
ඔයාගේ IDE එකේ ඒ වගේ extension එකක් නැත්තම් ඔයාට වෙනව postman වගේ software එකක් install කරගන්න.
නැත්තම් browser extension එකක් දාගන්න වෙනව.

අපි දැන් ටෙස්ට් කරමු අපේ web service එක.

<WSCode language="curl" code='
# මම data post කරන URL එක තමයි http://127.0.0.1:8000/api/v1/user/login
POST http://127.0.0.1:8000/api/v1/user/login HTTP/1.1

# මම request එකත් එක්ක යවන headers
Content-Type: application/json
Accept: application/json

# මගේ request body එක
{
	"username":"whizsid@aol.com",
	"password":"whizsid"
}

'/>

ඔයා හරි විදිහට කරානම් ඔයාටත් පල්ලෙහා තියනෙව වගේ response එකක් හම්බෙනව.

<WSCode language="json" code='
{
  "success": true,
  "message": "Successfully login!",
  "token": "eyJ0eX ..."
}
' />

## Login උන user ව චෙක් කරමු.

දැන් අපි බලමු කොහොමද කියල සාමාන්‍ය web service එකකදී login වෙල ඉන්න user ව ලබා ගන්නෙ කියල.
අපි ඒකට උදාහරණයක් විදිහට UserController එකේ තව function එකක් හදාගමු info කියල.
මේකෙන් කරන්නෙ දැනට login වෙල ඉන්න user ගේ තොරතුරු ලබා දෙන එක. දැන් ඔයා `app/Http/Controllers/API/V1/UserController.php` file එක open කරගන්න.

<WSCode language="php" code="
<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use App\Exceptions\APIException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    	public function login(Request $request){
		// ...
	}

	public function info(){
		$user=Auth::user();

		// response()-&gt;json(); ලෙස යොදා ගන්නේ json ලෙස අපගේ response එක යැවීමටයි
		return response()-&gt;json([
			'email'=&gt;$user-&gt;email,
			'userId'=&gt;$user-&gt;getKey()
		]);
	}
}

"/>

REST API වලත් login උන user ව ගන්නෙ වෙනද කරන විදිහටමයි කියල දැන් ඔයාලට තේරෙන්න ඇති. වෙනස් වෙන්නේ route කරන හැටියි web service එක call කරන හැටියි විතරයි.
දැන් අපි බලමු route කරන හැටි කොහොමද කියල. සුපුරුදු පරිදි දැන් අපි open කරගමු `routes/api/v1.php` file එක.

<WSCode language="php" code="
<?php

Route::group(['prefix'=&gt;'user'],function(){
	Route::post('login','UserController@login');

	Route::group([
		'middleware'=&gt;'auth:api'
	],function(){

		// login උන user ව ගන්න ඕන හැම web service එකකම route එක
		// ඔයා මේ middleware එක ඇතුලෙ define කරන්න ඕනේ.
		// එතකොට තමයි passport එකෙන් user ව ගන්න ඕන කියල දැනගන්නෙ.

		Route::post('info','UserController@info');

	});
});

"/>


අපි passport වලට token එක යවද්දිත් යවන්න ඕන විශේෂ ක්‍රමයකට. ඒ අපි හැමදාම යවනව වගේ body එකේ නෙවෙයි යවන්න ඕන. header එකේ තමයි යවන්න ඕන.
ඔයාගේ request එකට header එකක් එකතු කරන්න ඕන `Authorization: Bearer ezyssdS...` කියල. මේකේ `ezyssdS...` කියන එක වෙනුවට ඔයාට login web service එකේදි හම්බුන token එක දාන්න ඕන.

දැන් මම request එක යවන්නයි හදන්නෙ.

<WSCode language="curl" code='

POST http://127.0.0.1:8000/api/v1/user/info HTTP/1.1
Content-Type: application/json
Accept: application/json
// මේ තියෙන්නෙ අලුතෙන් මම එකතු කරපු header එක
Authorization: Bearer eyJ...

{
}

'/>

දැන් ඔයත් සාර්ථකව කලින් පියවර ටික කරානම් ඔයාටත් මට වගේම response එකක් ලැබෙන්න ඕන. මේ තියෙන්නෙ මගේ response එක.

<WSCode language="json" code='
{
  "email": "whizsid@aol.com",
  "userId": 1
}
'/>

දැන් ඔයාට පුළුවන් තව controllers හදල routes වලට එකතු කරන්න. එයා login උන user ව ගන්නවනම් ඒ routes defined කරන්න ඕනෙ `auth:api` කියන middleware එකේ. ඒ වගේම ඒවා access කරද්දි අනිවාරෙන්ම token එක තියෙන්න ඕන headers වල `Authorization: Bearer eajjnNj..` වගේ.

