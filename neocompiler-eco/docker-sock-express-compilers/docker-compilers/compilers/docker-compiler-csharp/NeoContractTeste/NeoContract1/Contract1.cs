using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services.Neo;
using System;
using System.Numerics;

namespace NeoContract1
{
    public class Contract1 : SmartContract
    {
        public static void Main()
        {
            Storage.Put(Storage.CurrentContext, "Hello", "World");
        }
    }
}
