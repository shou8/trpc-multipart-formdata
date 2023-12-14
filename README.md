# A minimal working tRPC example

Requires node 18 (for global fetch).

## Playing around

```
npm i
npm run dev
```

Try editing the ts files to see the type checking in action :)

## Building

```
npm run build
npm run start
```

## Testing

```
curl -s -XPOST -F 'file=@./assets/1.png' -F 'message=test' localhost:3000/upload
```
