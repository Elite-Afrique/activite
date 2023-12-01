<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Session;

class customAuth
{
/**
* Handle an incoming request.
*
* @param \Illuminate\Http\Request $request
* @param \Closure $next
* @return mixed
*/
public function handle($request, Closure $next)
{
$path = $request->path();
if($path=="logins" && Session::get('user')){
return redirect('/');
}
else if(($path!="logins" && !Session::get('user')) && ($path!="register" && !Session::get('user'))){
return redirect('/logins');
}
return $next($request);
}
}