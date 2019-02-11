DATE_TIME=`date "+%Y-%m-%d %H:%M:%S"`
OUTPUT_STRING="--------------------- $DATE_TIME : shellScript running. ---------------------"
echo $OUTPUT_STRING

cd ..
npm install
sleep 5
DATE_TIME=`date "+%Y-%m-%d %H:%M:%S"`
OUTPUT_STRING="--------------------- $DATE_TIME : process completed. ---------------------"
echo $OUTPUT_STRING

npm start