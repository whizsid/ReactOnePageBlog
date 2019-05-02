# Passport ස්ථාපනය කරගමු.

---

අප වෙබ් අඩවිය browser එක මගින් භාවිතා කරන්නන්ට අමතරව වෙනත් ආකාරයකින් අපගේ වෙබ් අඩවියේ සේවා අවශ්‍ය පුද්ගලයන් සිටිය හැක. (උදා:- Android App, ERP Systems). ඔවුන්ට අදාළ දත්ත, සෙවා සැපයීම REST API යනුවෙන් හැදින්වෙ. මොවුන්ගේ login details තබා ගැනීමට browser එකෙහි මෙන් ඔවුන්ට sessions යොදා ගැනීමට නොහැකිය. sessions යනු browser එකටම සීමා වූවකි. මෙයට විසදුමක් ලෙස laravel framework එක මගින් ඔබට passport නම් පැකේජය හදුන්වා දෙයි.

## Laravel Passport යනු

---

අතීතයේ REST API මගින් login data හුවමාරු කර ගැනීමට එම භාවිතා කරන්නන්ගේ අනන්‍ය ඉලක්කමක් හුවමාරු කෙරුණි. (user id). නමුත් මෙය ආරක්ෂාකාරී බවෙන් ඉතාමත් අඩුය. මන්ද යත් අපටද අහඹු ලෙස තෝරා ගන්නා ලද ඉලක්කමක් යැවිය හැක. මෙයට පිළියමක් ලෙස laravel කණ්ඩායම JSON වෙබ් සංකේත ක්‍රමය (JSON Web Tokens) යොදා ගන්නා passport නම් පැකේජය හදුන්වා දුන්නේය. මෙහි ක්‍රියාවලිය වන්නේ භාවිතා කරන්නා විසින් අපගේ login වෙබ් සේවාවට username හා password යැවූ විට එමගින් අකුරු 100කට නොඅඩු ඒ ඒ භාවිතා කරන්නාට අනන්‍ය වූ සංකේතයක් නිපදවා නැවතත් භාවිතා කරන්නාට යොමු කරයි. ඊළග අනන්‍යතාවය තහවුරු කළ යුතු වෙබ් සේවාව පිරික්සීමේදී භාව්තා කරන්නා විසින් එම සංකේතය ඉදිරිපත් කළ යුතුය.

## මූලික අධ්‍යාපනය

---

මෙම ලිපිය කියවීමට පෙර ඔබ laravel මූලික කරුණු දැනගෙන සිටිය යුතු අතර REST Client(Postman...) එකක් භාවිතා කරන ආකාරය දැන සිටිය යුතුය

## Passport නිවැරදිව ස්ථාපනය කරමු.

---

ඔබගේ වෙබ් ව්‍යාපෘතිය සදහා passport ලබා ගැනීමට එම ගොණුව තුල command line එකක් විවෘත කරගෙන පහත command එක යොදන්න.

<WSCode language="bash">
composer require laravel/passport
</WSCode>

දැන් සාර්ථකව ඔබගේ ව්‍යාපෘතිය සදහා passport ලැබී ඇත. ඉන්පසුව වෙබ් සංකේත ගබඩා කිරීමට අප වෙනම tables අපගේ දත්ත ගබාඩාවේ සැකසිය යුතුය. එය අප ස්වෝතසාහයෙන් සිදු කළ යුතු නැත.

<WSCode language="bash">
php artisan migrate
</WSCode>

මගින් අප වෙත් එම අවශ්‍ය tables සාදා දෙනු ලැබේ. 

ඉන්පසුව අපගේ සංකේත නිර්මාණය සදහා අනන්‍ය තවත් සංකේතයක් නිර්මාණය කර ගත යුතුය. එය අපගේ ව්‍යාපෘතියටම අනන්‍ය වූ සංකේතයක් ගොඩනැගීමට උපකාරී වේ. ඒ සදහා

<WSCode language="bash">
php artisan passport:install
</WSCode>

command එක run කරන්න. දැන් ඔබ සාර්ථකව passport ස්ථාපනය කරගෙන ඇති අතර තවත් පෙර සැකසුම් කිහිපයක් සුදු කළ යුතුය.

## ව්‍යාපෘතිය passport සදහා සූදානම් කිරීම.

---

අප passport ස්ථාපනය කළද අපගේ ව්‍යාපෘතිය තවමත් එය සදහා සූදානම් නැත. අපගේ ව්‍යාපෘතිය passport සදහා සැකසීමට ප්‍රථමයෙන්ම user model එක වෙනස් කළ යුතුය. ඒ සදහා ප්‍රථමයෙන්ම `app/User.php` යන file එක විවෘත කර ගන්න. ඉන්පසුව පහත පරිදි වෙනස් කරන්න.

<WSCode language="php" code="
<?php

namespace App;

// අළුතෙන් එකතු කරන්න
use Laravel\Passport\HasApiTokens;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
	// Notifiable අළුතෙන් එකතු කරන්න
    use HasApiTokens, Notifiable;
}
"/>

මෙමගින් User model එක සෑම අවස්ථාවකම passport භාවිතා කිරීමට පෙළඹෙයි. ඉන්පසුව `app/Providers/AuthServiceProvider.php` යන file එක විවෘත කරගන්න. එය පහත ආකාරයට වෙනස් කරන්න.

<WSCode language="php" code="
<?php

namespace App\Providers;

// අළුතෙන් එකතු කරන්න 
use Laravel\Passport\Passport;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' =&gt; 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this-&gt;registerPolicies();
		// අළුතෙන් එකතු කරන්න.
        Passport::routes();
    }
}
"/>

මෙය හේතුවෙන් passport පැකේජය අපගේ වෙබ් අඩවිය ආරම්භ වන මොහොතේදීම ආරම්භ වේ. මින් පසුව අවසාන ලෙස `config/auth.php` file එක විවෘත කරගන්න. එය පහත පරිදි වෙනස් කරගන්න.

<WSCode code="
'guards' =&gt; [
    'web' =&gt; [
        'driver' =&gt; 'session',
        'provider' =&gt; 'users',
    ],

    'api' = [
		// වෙනස් කරන්න
        'driver' =&gt; 'passport',
        'provider' =&gt; 'users',
    ],
],
">

මෙම වෙනස් කම සිදු කළ පසු භාවිත කරන්නාගේ අනන්‍යතාවය පරීකෂා කරන සෑම අවස්ථාවකදීම passport භාවතා කිරීමට laravel මගින් පෙළඹෙයි. මෙම පියවරත් සමග අප passport ස්ථාපනය කිරීම සාර්ථක වේ.