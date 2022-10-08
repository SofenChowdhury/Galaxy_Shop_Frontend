<?php
namespace App\Classes;
use Illuminate\Support\Facades\Http;


class SmsSender
{
   
    public function send_mobile_sms(array $smsData)
    {
   
        $api_key = "0b58bb4948c5e60b";
		$secrate_key = "4bb7aa1a";
        $callerId = (isset($smsData['callerId']) && $smsData['callerId'] !="")? $smsData['callerId'] : "hyundai";
        $sms_hosting_url = "http://217.172.190.215/sendtext";
		$to_user = $smsData['toUser'];
		$message_content = $smsData['message_content'];


		return $response = Http::get($sms_hosting_url, [
			'apikey' => $api_key,
			'secretkey' => $secrate_key,
			'callerID' => $callerId,
			'toUser' => $to_user,
			'messageContent' => $message_content
        ]);
    }


    // public function sendMobileBulkSms(array $smsData)
    // {
    //     $gs = Generalsetting::findOrFail(1);
    //     $api_key = $gs->sms_api_key;
	// 	$secrate_key = $gs->sms_api_secrate;
    //     $callerId = (isset($smsData['callerId']) && $smsData['callerId'] !="")? $smsData['callerId'] : $gs->sms_caller_id;
    //     $sms_hosting_url = $gs->sms_hosting_url;
	// 	$to_user =  implode(',', $smsData['toUser']);
	// 	$message_content = $smsData['message_content'];


	// 	return $response = Http::get($sms_hosting_url, [
	// 		'apikey' => $api_key,
	// 		'secretkey' => $secrate_key,
	// 		'callerID' => $callerId,
	// 		'toUser' => $to_user,
	// 		'messageContent' => $message_content
    //     ]);
    // }

}