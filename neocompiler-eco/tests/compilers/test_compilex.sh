#!/bin/bash

echo "testing Python"
b64py="UEsDBAoAAAAIAEeljVNFGfB9DAEAAH4BAAAIAAAAY29udHJhY3RVkMFqwzAMQO/5CtMd2sIIaWrHyaCn0R0Ga6EUCsMXWbGZWRIXxwHv76el29gEPujpSbZsg++Z9pC7IZrgr/nB+Pw0DdH1hrn+6kNkBx+d/bhnj28G3y8uDmYcs6w1lr2AG1brh4xR3B0vh/1pp5fFdgMVVlbr1hYlwlZsJBcW6ko3GgQ0XJStrAUgt9JiqaXgNUIJvCKClsNyHvgzT6Viq9IGOq+S1iq1lkipEoIgLPcqWVCprqja0IFXlRp+Ik8SJQXwqJKkJqQmLc9EkSglwDsqoX2+XRjMOHWR7f4tupqfsZ4FZ7+d28ZfcQ30cavFLDE3MoSuM2Gx/hWCiVMY2DlMJvuTP0E3muwTUEsBAhQACgAAAAgAR6WNU0UZ8H0MAQAAfgEAAAgAAAAAAAAAAAAAAAAAAAAAAGNvbnRyYWN0UEsFBgAAAAABAAEANgAAADIBAAAAAA=="
echo "$b64py"

echo "run docker-neo-boa for Python"
docker run -e COMPILECODE=$b64py -e COMPATIBLE=1 -t --rm docker-neo-boa

echo "================================"

echo "testing C#"
b64cs="UEsDBAoAAAAIAEOmjVOR6mgVygAAAIUBAAAIAAAAY29udHJhY3RljsGKwjAQhu95iqEnBYl3PQqyl12EHjzPxkGC06RMJlUR331jS7Wuc0hC+L/vn5x8OMIPRVs3KLqJQQWd2q1gQ+coJ1uTdN5RsiW0NiaU/9Sio0/I3AyUafMveweOMSX4Iua4j8IHWMFE+sY9qIGd8ElRy9VFf4Bv9GE2fyZe2ccsl3AWr5SgQ84EVV9XQQzFEQWPBCe6QtWvUv1HfdOWNq98BYfMCeqBsbuss/G9ySIU+oXpoovRtRi75m/WqeEjuX5G72Y47+YPUEsBAhQACgAAAAgAQ6aNU5HqaBXKAAAAhQEAAAgAAAAAAAAAAAAAAAAAAAAAAGNvbnRyYWN0UEsFBgAAAAABAAEANgAAAPAAAAAAAA=="
echo "$b64cs"

echo "run docker-mono-neo-compiler for C#"
docker run -e COMPILECODE=$b64cs -e COMPATIBLE=1 -t --rm docker-mono-neo-compiler