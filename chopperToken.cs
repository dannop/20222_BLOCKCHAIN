using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services.Neo;
using Neo.SmartContract.Framework.Services.System;
using System;
using System.ComponentModel;
using System.Numerics; 

namespace Neo.SmartContract
{
    public class BeginChopperToken : Framework.SmartContract
    {
        // Token Settings
        public static string Name() => "Choppercoin";
        public static string Symbol() => "CHP";
        // Dono dos Tokens iniciais
        public static readonly byte[] Owner = "AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y".ToScriptHash();
        public static byte Decimals() => 8;
        private const ulong factor = 100000000;
        private const ulong neo_decimals = 100000000;

        private static readonly byte[] neo_asset_id = { 155, 124, 255, 218, 116, 196, 174, 15, 147 };
        // Quantidade Total do Token
        private const ulong total_amount = 100000000 * factor;
        private const ulong pre_ico_cap = 100000000 * factor;
        private const ulong basic_rate = 1000 * factor;
        private const int ico_start_time = 1641854598;
        private const int ico_end_time = 1642459398;

        [DisplayName("transfer")]
        public static event Action<byte[], byte[], BigInteger> Transferred;

        [DisplayName("refund")]
        public static event Action<byte[], BigInteger> Refund;

        public static Object Main(string operation, params object[] args)
        {
            if (Runtime.Trigger == TriggerType.Verification)
            {
                if (Owner.Length == 20)
                {
                    return Runtime.CheckWitness(Owner);
                }
                else if (Owner.Length == 33)
                {
                    byte[] signature = operationAsByteArray();
                    return VerifySigature(signature, Owner);
                }
            }
            else if (Runtime.Trigger == TriggerType.Application)
            {
                // Operacao de inicializacao do contrato
                if (operation == "deploy") return Deploy();
                if (operation == "minTokens") return MintTokens();
                if (operation == "totalSupply") return TotalSupply();
                if (operation == "name") return Name();
                if (operation == "symbol") return Symbol();
                if (operation == "transfer") 
                {
                    if (args.Length != 3) return false;
                    byte[] from = (byte[]args[0]);
                    byte[] to = (byte[])args[1];
                    BigInteger value = (BigInteger)args[2];
                    return Transfer(from, to, value);
                }
                if (operation == "balenceOf") 
                {
                    if (args.Length != 1) return 0;
                    byte[] account = (byte[]args[0]);
                    return BalenceOf(account);
                }
                if (operation == "decimals") return Decimals();
            }
            byte[] sender GetSender();
            ulong contribute_value = GetContributeValue();
            if (contribute_value > 0 && sender.Length != 0)
            {
                Refund(sender, contribute_value);
            }
            return false;
        }

        public static bool Deploy()
        {
            byte[] total_supply = Storage.Get("totalSupply");
            if (total_supply.Length != 0) return false;
            Storage.Put(Owner, pre_ico_cap);
            Storage.Put("totalSupply", pre_ico_cap);
            Transferred(null, Owner, pre_ico_cap);
            return true;
        }

        public static bool MintTokens()
        {
            byte[] sender = GetSender();
            if (sender.Length == 0) return false;
            ulong contribute_value = GetContributeValue();
            ulong swap_rate = CurrentSwapRate();
            if (swap_rate == 0)
            {
                Refund(sender, contribute_value)
                return false;
            } 
            ulong token = CurrentSwapToken(sender, contribute_value, swap_rate);
            if (token == 0) return false;

            BigInteger balance = Storage.Get(sender).AsBigInteger();
            Storage.Put(sender, token + balance);
            BigInteger totalSupply = Storage.Get("totalSupply").AsBigInteger();
            Storage.Put("totalSupply", token + totalSupply);
            Transferred(null, sender, token);
            return true;
        }

        public static BigInteger TotalSupply()
        {
            return Storage.Get("totalSupply").AsBigInteger();
        }

        public static bool Transfer(byte[] from, byte[] to, BigInteger value)
        {
            if (value <= 0) return false;
            if (!Runtime.CheckWitness(from)) return false;
            if (to.Length != 20) return false;

            BigInteger from_value = Storage.Get(from).AsBigInteger();
            if (from_value < value) return false;
            if (from == to) return true;
            if (from_value == value) Storage.Delete(from);
            else Storage.Put(from, from_value - value);

            BigInteger to_value = Storage.Get(to).AsBigInteger();
            Storage.Put(to, to_value + value);
            Transferred(from, to, value);
            return true;
        }

        public static BigInteger BalanceOf(byte[] address)
        {
            return Storage.Get(address).AsBigInteger();
        }

        private static ulong CurrentSwapRate()
        {
            const int ico_duration = ico_end_time - ico_start_time;
            uint now = Runtime.Time;
            int time = (int)now - ico_start_time;
            if (time < 0)
            {
                return 0;
            }
            else if (time < ico_duration)
            {
                return basic_rate;
            }
            else 
            {
                return 0;
            }

            private static ulong CurrentSwapToken(byte[] sender, ulong value, ulong swap_rate)
            {
                ulong token = value / neo_decimals * swap_rate;
                BigInteger total_supply = Storage.Get("totalSupply").AsBigInteger();
                BigInteger balance_token = total_amount - total_supply;
                if (balance_token <= 0)
                {
                    Refund(sender, value);
                    return 0;
                }
                else if (balance_token < token)
                {
                    Refund(sender, (token - balance_token) / swap_rate * neo_decimals);
                    token = (ulong)balance_token;
                }
                return token;
            }

            private static byte[] GetSender()
            {
                Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;
                TransactionOutput[] reference = tx.GetReferences();
                foreach (TransactionOutput output in reference)
                {
                    if (output.AssetId == neo_asset_id) return output.ScriptHash;
                }
                return new byte[]{};
            }

            private static byte[] GetReceiver()
            {
                return ExecutionEngine.ExecutingScriptHash;
            }

            private static ulong GetContributeValue()
            {
                Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;
                TransactionOutput[] outputs = tx.GetOutputs();
                ulong value = 0;
                foreach (TransactionOutput output in outputs)
                {
                    if (output.ScriptHash == GetReceiver() && output.AssetId == neo_asset_id)
                    {
                        value += (ulong)output.Value;
                    }
                }
                return value;
            }
        }
    }
}
