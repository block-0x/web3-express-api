export function getWeb3() {
    return new Web3(new Web3.providers.HttpProvider(ep));
}