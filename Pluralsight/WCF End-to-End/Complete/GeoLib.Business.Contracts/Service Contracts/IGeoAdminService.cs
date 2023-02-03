using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using GeoLib.Common.Contracts;

namespace GeoLib.Business.Contracts
{
    [ServiceContract(CallbackContract = typeof(IUpdateZipCallback))]
    public interface IGeoAdminService
    {
        [OperationContract]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        void UpdateZipCity(string zip, string city);

        [OperationContract(Name = "UpdateZipCityBatch")]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        int UpdateZipCity(IEnumerable<ZipCityData> zipCityData);
    }
}
