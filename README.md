# jamocha

Write tests for nodejs, then run in jasmine. Bonus: have mocha `spec` reporter (or `list`, `tap`, `nyan`).

## Usage

```sh
# prepare
npm install -D jasmine jamocha
mkdir test ; cp node_modules/jamocha/test/.jasmine.json test/

# set test script to `jasmine --reporter=jamocha/spec --config=test/.jasmine.json`
node -r fs -e "const p = require('./package.json'); p.scripts.test = 'jasmine --reporter=jamocha/spec --config=test/.jasmine.json'; fs.writeFileSync ('./package.json', JSON.stringify (p, null, 2));"

# test
npm test

```


## Reasons

### Mocha have better reports

So, I've *adopted* them

### Jasmine `expect` almost as good as jest one

Use builtin `expect`, nodejs `assert` or anything else.

With reduced cost, because:

### Jasmine have much less deps than others

jasmine: **12 dependencies**

```
npm i -D jasmine
+ jasmine@3.4.0
added 13 packages from 4 contributors and audited 16 packages in 2.371s
```

mocha: **114 dependencies**

```
npm i -D mocha
+ mocha@6.1.2
added 115 packages from 507 contributors and audited 223 packages in 4.305s
```

ava: **521 dependency**

```
npm i -D ava

> fsevents@1.2.7 install jamocha/node_modules/fsevents
> node install

node-pre-gyp WARN Using needle for node-pre-gyp https download 
[fsevents] Success: "jamocha/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote
+ ava@1.4.1
added 522 packages from 223 contributors and audited 3399 packages in 14.44s
```

jest: **556 dependencies**

```
npm i -D jest

> fsevents@1.2.7 install jamocha/node_modules/fsevents
> node install

node-pre-gyp WARN Using request for node-pre-gyp https download 
[fsevents] Success: "jamocha/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote
+ jest@24.7.1
added 556 packages from 373 contributors and audited 849829 packages in 22.241s
```

