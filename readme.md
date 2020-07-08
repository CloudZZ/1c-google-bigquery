# 1c to BigQuery

Goal: implement sending data from 1c to Google BigQuery
Problem: 1C can't generate session key for connection to BigQuery
Resolution: create REST function for handling session key creation

# Api
Endpoint deployed at `https://bigquery-1c.web.app/sign`

### Request format
```json
{
"pem": "key",
"body": "body to encrypt"
}
```
### Responce format
```json
{
"code": "status code",
"message": "result, is digest or error"
}
```
On successful execution `code` is `200` and message will contain digest.
On error mostly 500 or 400 code will be thrown.

## To encode\decode data
Api accepts json, to pass multiline string in json you need to base64 encode it.

In js base64 encode\decode buffer used, in 1c there is similar commands:

```1c
Base64Строка();
Base64Значение();
```

API response also encoded (do not forget to decode it before using as session key)

## usage example

```bash
curl --location --request POST 'https://bigquery-1c.web.app/sign' \
--header 'Content-Type: application/json' \
--data-raw '{"pem": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDV3dJQkFBS0JnUUMvR0lnK2dtbzFuTHJmNzV4SHg3TjJ5OG0vRmxDN3RuWlQvMDBuUTBtVW12SHBMNE56CjJUZ1YrZ3lnck1yNXRFVHdNNzhqdU8yZTM0RStvd2pPUW1PNEZMeVZkejZ0K0JpcTh1VGRHYUJWdElmQWNKRzUKdy9QQy9lUXFhRnBFRTFMd3dCZVI2YUtJU0FVYXhrdnoyaDRwZmhkYkgzeFlCcTJDSnZzZVdRaTF5d0lEQVFBQgpBb0dBWmdSSHYrOUptaU40MUZJTHdYcElRYlJibU9ybDRNQncvVGkvVEtXc1kyd3dsMGRwU3ZCODg2YVJGVG9LCkJqS0oxeDRZL1k0ZE5RS204ZlNCbi9OclhnOFdFQWUxM1ArK2d0YUhPNi9QOVhaSElmdW9GOU9DSjFWYWtGTm4KOCs3QUhCTWdPMEM5Zm5DbVV2SzcxNGREcG9ud2pYTkVubzVabHpKbzVDeHJCMEVDUVFEcDFCZ1gxR3Zmc1cwSQpGWTVMeEpyOWlwbk96aHdJUG9ncmJnUDZxb0NDMklnRG9YMk5jcXgwWk81S0VSOWkrSnhwOTFTZEdYVnFaMElzClhTQmJnMzloQWtFQTBUY25hK25Oa1U1RHdZTVpnNW5EdWtVVkcvVWdkRlNwUHlKb3l6MWY3aytrZkMrN0tLSVoKQm1oTCtFeG5TYUkwZXVKcDFPWk14QWl3SG83QS9sYWdxd0pBQTNia0FINWlOc2MvTVU1NGRFRHVkdkUxeEMyagpscSt1ZnM0N2V0eEoyU1p5SlhPZ0U1ZHVYSzhlSkxUS1BVSW50eDQxLzduZjFucS9MVDhYK3FNaElRSkFjTW0rCkcrUXdxWXc2NU9FTGFUSUZIYTlPZ1FMMld5Q2xHVjh3aFpqeDFhVGo5UHM2ZDk1amhWdkcwUFpIbkord2tTcnMKaVJVYS8zZjdrbzI5SjZDRi93SkFYWktSOEZKMTJ0bHlVcFBUazRZRi9pRnFrU1pyNXZnc05VYnpldGJxMG1laQpmSzNseStmWjF5QW1ST2htampyVkdDQjFrSnBWSUQwbzlRbjFqcm9WV2c9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ==","body": "body"}'
```



## todo
- 1c example
