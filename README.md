# WhizSid - සිංහල පරගණක භාෂා ලියකියවිලි

සිංහල සිසුන්ගේ පරිගණක භාෂා හැකියාව වර්ධනය කිරීමේ අරමුණින් හා පරිගණක භාෂා සාක්ෂරතාවය වැඩි කිරීමේ අරමුණින් මෙම ව්‍යාපෘතිය ආරම්භ කරන ලදී. මෙය විවෘත කේත වැඩසටහණක් වන අතර ඔබ දන්නා කරුණු ඇතුළත් කිරීම ද, සාවද්‍ය කරුණු නිවැරදි කිරීමට ඔබට නිදහස ඇත.

## ව්‍යාපෘතියට සාභාගී වීමට

මෙම ව්‍යාපෘතියට සාභාගී වීමටනම් ඔබ අපගේ පිටපතක් ලබා ගැනීම සඳහා fork කළ යුතුය. ඉන්පසුව ඔබගේ පිටපතේ අදාළ වේනස්කම් සිදු කර Merge Request එකක් යොමු කරන්න. ඔබගේ වෙනස්කම් පරීකෂාවකට භාජනය වීමෙන් අනතුරුව Merge කිරීම සිදු කරනු ලැබේ. master නම් ශාකාව Github pages සඳහා වැදග්ත් වන නිසා ඔබගේ සියලුම වෙනස්කම් source නම් ශාකාවේ සිදු කරන්න.

කේත:-
```
# ඔබගේ පිටපත බාගත කිරීම
git clone https://github.com/yourusername/whizsid.github.io
# source ශාකාවට මාරුවීම
git checkout source
# අත්‍යවශය package ලබා ගැනීම
npm install
# ව්‍යාපෘතිය දර්ශනය කිරීම
npm run start
```

## ලිපි ලියන්නන් සඳහා

සියලුම ලිපි markdown කේත ක්‍රමයෙන් ලියවෙන අතර Json කේත ක්‍රමයට මෙනු සඳහා එකතු කිරීම කළ යුතුය. තවද භාෂා භාවිතයේදී හැකිතාක් සිංහල වචන භාවිතා කරන මෙන් ඉල්ලා සිටින අතර එය ආයාසාත්මක වචන වලට පමණක් ඉංග්‍රීසි භාෂාව යොදා ගන්න.(Open your browser -> ඔබගේ  browser එක open කරන්න.) කතෘ භාෂාවම යොදා ගැනීමට අවශ්‍ය නැත. පරිශීලකයාට පහසු භාෂාවක් නිතරම යොදාගන්න.

ප්‍රධාන මෙනුවෙහි අයිතම ඇත්තේ `./public/data/posts/index.json` ගොණුවහෙි ය.
```
{
	"items":{
		"react":{
			"icon":"react",
			"title":"React JS",
			"description":"React JS යනු නවීන MVC ආකෘතියට සැදූ frontend framework එකකි. මෙම භාෂාව මගින් real time වෙබ් අඩවි නිර්මාණය කිළ හැකිය."
		},
		"laravel":{
			"icon":"laravel",
			"title":"Laravel",
			"description":"Laravel යනු ඉතා බලගතු MVC ආකෘතියට නිමවූ framework එකකි."
		}
	}
}
```

නව පරිගණක භාෂාවක ලිපියක් ලිවූ විට එම පරාගණක භාෂාවේ නම, පින්තූරය, කෙටි විස්තර කිරීමක් එකතු කිරීමට ප්‍රධාන මෙනුව භාවිතා වේ. මෙහි key එක යනු එහි අණු කොටස් ඇති ලිපි ගොණුවේ නාමයයි. (උදාහරණ react යන නමෙන් ලිපි ගොණුවක් `./public/data/posts/` තුළ දැකිය හැකිය.)

අයිකන එකතු කිරීමේදී ඔබ එම අයිකන ප්‍රථමයෙන්ම `./public/data/resources/menuIcons` ගොණුවට පිටපත් කළ යුතු අතර ඉන්පසුව `./public/data/posts/index.json` හි icon වෙනුවට එම file name එක ලබා දෙන්න. පෙර ඇතුළත් කරන ලද අයිකන අධ්‍යනය කිරීම මගින් ඔබට මෙය මැනවින් අවබෝධ කර ගත හැකිය.

අනෙකුත් මෙනු සඳහා අයිතම එකතු කිරීමේදී හෝ අනකෙුත් මෙනු සෑදීමේදී එම මෙනුවට අදාළ ලිපි ගොණුවේ `index.json` file එක edit කරන්න.

```
{
	"items":{
		"first":{
			"title":"First Post",
			"description":"This is the first part",
			"link":"/post/react/beginner/first"
		},
		"second":{
			"title":"Second Sub Menu",
			"description":"Description about this sub menu"
		}
	}
}
```

මෙයද පෙර අප ප්‍රධාන මෙනුවට අයිතම එක්කළ ආකාරයටම සිදුකළ යුතු අතර sub menu එකක් වෙනුවට link එකක් යොදා ගැනීමට අවශ්‍යනම් link යන key එක යොදා ගන්න. sub menus සඳහා අයිකන යොදා ගැනීමේ පහසුකමක් නොමැත.

ඔබට ඔබ ලියූ ලිපියක් වෙත link එකක් යෙදීමට අවශ්‍යනම් link එක වෙනුවට `/post/main_menu_folder_name/sub_menu_1_folder_name/../../your_post_name_without_extension` යන ආකෘතියට අදාළව ඔබගේ ලිපියට මග පෙන්වන link එක දමන්න.

සියලුම ලිපි markdown කේත ක්‍රමයෙන් ලිවිය යුතුය.

පිටු සඳහා කතෲන් පිළිබඳ තොරතුරු ඇතුළත් කිරීමේදී `meta/posts/` යන ගොණුව තුළ පෙර පරිදිම ගොණුවක් සකසා ගන්න. උදාහරණයක් ලෙසා ඔබගේ ලිපියෙහි ගොණු ලිපිනය `/public/data/posts/react/beginner/first.md` නම් ඔබගේ කතෘ විස්තර ඇතුළත් කළ යුත්තේ `/public/data/meta/posts/react/beginner/first.json` තුළයි. මෙම json හි නීළ ආකෘතිය පහත දැක්වේ.

```

{
	"time":"2019-04-05 22:34:00",
	"next":{
		"title":"Next Page",
		"link":"/post/react/beginner/second"
	},
	"previous":{
		"title":"Previous Page",
		"link":"/post/react/beginner/start"
	},
	"writers":[
		{
			"name":"WhizSid",
			"username":"whizsid",
			"avatar":"whizsid.png"
		}
	],
	"seeAlso":[
		{
			"title":"Second Page",
			"link":"/post/react/beginner/start"
		}
	]
}

```

`time` යනු අවසානයට එම ලිපිය සකස් කළ වේලාවය. මෙය අනිවාර්ය වේ.

`next`  හා `previous` යනු ඊට පෙර පිටුව සහ පසු පිට්වයි.

`writers` යනු මෙය ලිවීමට දායක වූ අයයි. ඔබ කුමක් හෝ සංස්කරණයක් කල පසු මෙය සඳහා ඔබ පිළිබදවද ඇතුළත් කරන්න. `avatar` එක අනිවර්යෙන්ම `/public/data/resources/writerAvatars/` තුළ තිබිය යුතු අතර `filename` එක පමණක් සපයන්න.

`seeAlso` යනු ඒ හා සබැදි වෙනත් පිටුයි.

## සංවර්ධකයන් සඳහා

අප github pages මගින් මෙය ප්‍රචාරය කරන නිසා server side පරිගණක භාෂා යොදා ගත නොහැකිය. එම නිසා frontend MVC ආකෘතියක් ඇති framework එකක් භාවිතා කිරීමට පෙළඹුණි. 

අප යොදාගත් තාක්ෂණය:-
 - React JS
 - TypeScript 
 - React Redux
 - Material UI
 - Axios
 - ESLint

 සෑම විටම ESLint අවවාද නොමැති වන සේ ඔබගේ කේත සකසන්න. ඔබ අප වෙත යොමු කරන සෑම `PR` ක්ම අප පරීකෂා කර ඇතුළත් කරනු ලැබේ. 