import urllib.request
import re

url = "https://www.youtube.com/results?search_query=tamil+songs+live+24%2F7"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
    print(list(dict.fromkeys(ids))[:10])
except Exception as e:
    print(e)
