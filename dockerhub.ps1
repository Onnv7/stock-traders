

docker login

docker-compose -f docker-compose.build.yaml build

$images=@(
  "on611/api-gateway:latest",
  "on611/stock-fetch-service:latest",
  "on611/stock-processing-service:latest",
  "on611/stock-socket-service:latest",
  "on611/stock-tracking-web:latest"
)

# Tag và push các image
foreach ($image in $images) {
    $image_name = $image.Split(':')[0]
    $image_tag = $image.Split(':')[1]
    $repo_name = $image_name.Split('/')[1]
    $formatted_name = "stocktraders-$repo_name"
    $image_id = docker images -q $formatted_name

    if ($image_id) {
        docker tag $formatted_name $image
        docker push $image
    } else {
        Write-Host "Image ID for $image_name not found."
    }
}