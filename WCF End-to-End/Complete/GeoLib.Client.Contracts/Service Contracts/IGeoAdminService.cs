using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using GeoLib.Common.Contracts;
using System.Threading.Tasks;

namespace GeoLib.Client.Contracts
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

        [OperationContract(Name = "UpdateZipCityBatch")]
        Task<int> UpdateZipCityAsync(IEnumerable<ZipCityData> zipCityData);
    }
}
