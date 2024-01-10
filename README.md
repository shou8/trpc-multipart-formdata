# A minimal working tRPC example

## Playing around

```
npm i
npm run dev:node
# or
npm run dev:fastify
```

## Testing

```
curl -s -XPOST -F 'file=@./assets/1.png' -F 'message=test' localhost:3000/upload
```
