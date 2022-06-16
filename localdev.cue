package livefront

import (
	"dagger.io/dagger"
)

client: {
  //ここでoutputディレクトリを作成する
	filesystem: "./out": write: contents: actions.build.output
	env: {
		NETLIFY_TOKEN: dagger.#Secret
		USER:          string
	}
}
actions: deploy: {
	token: client.env.NETLIFY_TOKEN
	site:  "\(client.env.USER)-live-front"
}
