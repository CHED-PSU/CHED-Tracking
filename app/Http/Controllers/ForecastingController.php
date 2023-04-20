<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ForecastingController extends Controller
{
    public function forecast(Request $request){
        $getdata =DB::table('test_data')
        ->get();
        $getdataX =DB::table('test_data')
        ->select('year')
        ->get();
        $getdataY =DB::table('test_data')
        ->select('total_cost')
        ->get();

        $Ex = 0;
        $Ey =0;
        $Exy = 0;
        $xtwo = 0;

        foreach($getdata as $data){
            $tempx = $data->year;
            $tempy = $data->total_cost;
            $Ex = $Ex + $data->year;
            $Ey = $Ey + $data->total_cost;
            $tempExy = $tempx * $tempy;
            $Exy +=  $tempExy;
            $xtwo +=($data->year * $data->year);
        }

        //getting the slope
        $n = sizeof($getdata);
        $slope1 = $n*$Exy;
        $slope2 =$Ex * $Ey;
        $slope3 =$n*$xtwo;
        $slope4 = $Ex * $Ex;
        $slope= ($slope1 - $slope2)/($slope3 - $slope4);
        //getting the y intercept
        $yInt = ($Ey - ($slope *$Ex))/$n;


        $today = intval(date('Y'));

        $predict = $today*$slope+$yInt;

        $predicted_data = [];

        $yearStopped = 0;
        $count  = 0;

        foreach($getdata as $data){
            $yearStopped = $data->year;
            $count++;
            $temp = $data->year*$slope+$yInt;
            array_push($predicted_data,$temp);
        }

        $getpdataX = [];
        $getpdataY = [];

        for($x = $yearStopped+1;  $x <= $yearStopped+3; $x++){
            $temp = $x*$slope+$yInt;
            $dataX = [
                'year' => $x,
            ];
            $dataY = [
                'total_cost' => $temp
            ];
            // $getdataX->push((object) $dataX);
            // $getdataY->push((object) $dataY);
            $getpdataX[] = (object) $dataX;
            $getpdataY[] = (object) $dataY;
        }

        $getdata =DB::table('test_data')
        ->limit(12)
        ->orderBy('year', 'desc')
        ->get();

        return response()->json([
            'data' => $getdata,
            'predicted'=>intval($predict),
            'xAxis' =>$getdataX,
            'yAxis' => $getdataY,
            'pxAxis' =>$getpdataX,
            'pyAxis' => $getpdataY,
            'predicted_data' => $predicted_data,
            'data' => $getdata,
        ]);
    }

    public function disposalForecast(Request $request){
        $getdata =DB::table('disposal_data')
        ->get();
        $getdataX =DB::table('disposal_data')
        ->select('year')
        ->get();
        $getdataY =DB::table('disposal_data')
        ->select('quantity')
        ->get();

        $Ex = 0;
        $Ey =0;
        $Exy = 0;
        $xtwo = 0;

        foreach($getdata as $data){
            $tempx = $data->year;
            $tempy = $data->quantity;
            $Ex = $Ex + $data->year;
            $Ey = $Ey + $data->quantity;
            $tempExy = $tempx * $tempy;
            $Exy +=  $tempExy;
            $xtwo +=($data->year * $data->year);
        }

        //getting the slope
        $n = sizeof($getdata);
        $slope1 = $n*$Exy;
        $slope2 =$Ex * $Ey;
        $slope3 =$n*$xtwo;
        $slope4 = $Ex * $Ex;
        $slope= ($slope1 - $slope2)/($slope3 - $slope4);
        //getting the y intercept
        $yInt = ($Ey - ($slope *$Ex))/$n;


        $today = intval(date('Y'));

        $predict = $today*$slope+$yInt;

        $predicted_data = [];

        foreach($getdata as $data){
            $temp = $data->year*$slope+$yInt;
            array_push($predicted_data,$temp);
        }

        return response()->json([
            'data' => $getdata,
            'predicted'=>intval($predict),
            'xAxis' =>$getdataX,
            'yAxis' => $getdataY,
            'predicted_data' => $predicted_data
        ]);


    }

    public function forecastSpecific(Request $request){
        $getdata =DB::table('test_data')
        ->get();

        $Ex = 0;
        $Ey =0;
        $Exy = 0;
        $xtwo = 0;

        foreach($getdata as $data){
            $tempx = $data->year;
            $tempy = $data->total_cost;
            $Ex = $Ex + $data->year;
            $Ey = $Ey + $data->total_cost;
            $tempExy = $tempx * $tempy;
            $Exy +=  $tempExy;
            $xtwo +=($data->year * $data->year);
        }

        //getting the slope
        $n = sizeof($getdata);
        $slope1 = $n*$Exy;
        $slope2 =$Ex * $Ey;
        $slope3 =$n*$xtwo;
        $slope4 = $Ex * $Ex;
        $slope= ($slope1 - $slope2)/($slope3 - $slope4);
        //getting the y intercept
        $yInt = ($Ey - ($slope *$Ex))/$n;

        $predict = $request->input('value')*$slope+$yInt;

        return response()->json([
            'predicted' => intval($predict)
        ]);
    }
    public function totalCostPerYear(){
        $getdata =DB::table('test_data')
        ->limit(12)
        ->orderBy('year', 'desc')
        ->get();

        return response()->json([
            'data' => $getdata
        ]);
    }
}
