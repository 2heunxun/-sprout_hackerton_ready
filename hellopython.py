space = ' '
star = '*'

n = int(input("몇 층까지 쌓을까요?"))
for i in range(n, 0, -1):
    print(space * (i-1) + star * (n-(i-1)))
