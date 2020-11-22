import sys
import json

arr = sys.argv[1].split(',')
send_message_back = {
  'arguments': arr,
  'message': 'alpha',
  'msg2' :'alpha2'
}


print(json.dumps(send_message_back))
