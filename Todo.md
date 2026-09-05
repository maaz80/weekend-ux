<!-- Event snippet for Submit lead form conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-18407334859/tb_2CK2EiO4cEMvHpslE',
      'value': 1.0,
      'currency': 'INR'
  });
</script>


<!-- Event snippet for Submit lead form conversion page
In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->
<script>
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-18407334859/tb_2CK2EiO4cEMvHpslE',
      'value': 1.0,
      'currency': 'INR',
      'event_callback': callback
  });
  return false;
}
</script>



![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)