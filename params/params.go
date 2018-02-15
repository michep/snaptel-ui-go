package params

type Params struct {
	ListenAddr   string `short:"l" long:"listen" required:"true" description:"snaptel-ui listen address"`
	SnapListFile string `short:"f" long:"file" required:"true" description:"file with list of snap-telemetry URLs"`
}
