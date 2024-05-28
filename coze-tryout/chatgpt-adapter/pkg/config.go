package pkg

import (
	"bytes"
	"github.com/spf13/viper"
	"os"
)

var (
	Config *viper.Viper
)

func LoadConfig() (*viper.Viper, error) {
	data, err := os.ReadFile("config.yaml")
	if err != nil {
		return nil, err
	}

	vip := viper.New()
	vip.SetConfigType("yaml")
	if err = vip.ReadConfig(bytes.NewReader(data)); err != nil {
		return nil, err
	}

	return vip, nil
}

func Init() {
	config, err := LoadConfig()
	if err != nil {
		panic(err)
	}
	Config = config
}
