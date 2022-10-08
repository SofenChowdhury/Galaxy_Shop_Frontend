<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!--[if (gte mso 9)|(IE)]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
    <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
    <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS -->
    <meta name="format-detection" content="address=no"> <!-- disable auto address linking in iOS -->
    <meta name="format-detection" content="email=no"> <!-- disable auto email linking in iOS -->
    <meta name="author" content="Simple-Pleb.com">
    <title>{{ __('pleb.mail.Welcome Title') }} | {{ config('app.name') }}</title>

    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <style type="text/css">
        /*Basics*/
        body {margin:0px !important; padding:0px !important; display:block !important; min-width:100% !important; width:100% !important; -webkit-text-size-adjust:none;}
        table, th, td {
            border: solid 1px #3b3b3b;
            border-collapse: collapse;
            width: 90%;
            margin-bottom: 10px;
        }
        th, td{
            padding: 10px;
            text-align: left;
        }
    </style>

</head>

<body  style="margin-top: 10px; margin-bottom: 0; padding-left: 3em; padding-right: 3em; padding-top: 20px; padding-bottom: 20px; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color:#f0f0f0">
    
    
    <div style="margin:1em 5%; background-color:#ffffff; padding:20px; border-radius: 0.3cm; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; overflow-x:auto;">
        <center>
            <img width="200" height="60" src="https://fairelectronics.com.bd/pub/media/logo/Fair-Electronics_1_.png" alt="">
        </center>
        <p>Dear Concern,</p>
        <p>Payment Slip has been uploaded on <strong>{{$order->order_number}}</strong> order</p>
        <h4>Requesting to verify the following payment</h4>
        
        <table>            
            <tbody>
                <tr>
                    <th colspan="2"><h3>Payment Information</h3></th>                    
                </tr>
                <tr>
                    <th style="width: 30%;">Bank Name</th>
                    <td style="width: 50%;">{{ $payment->bank }}</td>
                </tr>
                <tr>
                    <th style="width: 30%;">Branch</th>
                    <td style="width: 50%;">{{ $payment->branch }}</td>
                </tr>
                <tr>
                    <th style="width: 30%;">Account Number</th>
                    <td style="width: 50%;">{{ $payment->account_number }}</td>
                </tr>
                <tr>
                    <th style="width: 30%;">Amount</th>
                    <td style="width: 50%;">{{ $payment->amount_credit }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>