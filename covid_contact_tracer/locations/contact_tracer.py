from django_pandas.io import read_frame
import pandas as pd
from sklearn.cluster import DBSCAN

# Query all locations, return locations with object cluster and clusters
# data is all locations serialized
def getUserLocationWithCluster(user, query, data):
    #Social distance
    safe_distance = 0.0018288 #6 feets in kilometers
    # Create panda of locations for data analysis
    df = read_frame(query, fieldnames=['latitude', 'longitude', 'startTime', 'endTime', 'id'])
    #Apply model, in case of larger dataset or noisy one, increase min_samples
    model = DBSCAN(eps=safe_distance, min_samples=2, metric='haversine').fit(df[['latitude', 'longitude']])
    # Get clusters found by the algorithm convert to pandas and add column for index number
    dbscan_result = pd.DataFrame(model.labels_.tolist())
    dbscan_result["locations_id"] = df.get("id")
    # Get a dict whose keys are the cluster number and contains a list of your elements
    clusters = {}
    # Assign cluster id for each location and locations to each cluster
    for i,cluster_id in enumerate(dbscan_result[0]):
        data[i]["cluster_id"]= cluster_id
        if cluster_id in clusters:
            clusters[cluster_id].append(data[i])
        else:
            clusters[cluster_id] = []
            clusters[cluster_id].append(data[i])
    # Get user locations
    user_locations = list(filter(lambda location: location["owner"] == user.id, data))
    # Get the user intersections of a cluster
    for location in user_locations:
        # get locations that are in the same cluster
        list_locations_id = clusters[location["cluster_id"]]
        for other_location in list_locations_id:
            # intercts
            if (location["startTime"] <=  other_location["endTime"] and location["endTime"] >=  other_location["startTime"]):
                if "contacts" in location:
                    location["contacts"].append(other_location["id"])
                else:
                    location["contacts"] = []
                    location["contacts"].append(other_location["id"])

    return user_locations

# For each user location test if they were at same time and then create new set of clusters
def contactTracing(all_locations, user_locations):
    print("oi")

#     #Get the clusters the inputName is a part of
#     inputNameClusters = set()
#     for i in range(len(dataFrame)):
#         if dataFrame['User'][i] == inputName:
#             inputNameClusters.add(dataFrame['Cluster'][i])
#    #Get people who are in the same cluster as the inputName              
#     infected = set()
#     for cluster in inputNameClusters:
#         if cluster != -1: #as long as it is not the -1 cluster
#             namesInCluster = dataFrame.loc[dataFrame['Cluster'] == cluster, 'User'] #Get all names in the cluster
#             for i in range(len(namesInCluster)):
#               #locate each name on the cluster
#                 name = namesInCluster.iloc[i]
#                 if name != inputName: #Don't want to add the input to the results
#                     infected.add(name)
#     print("Potential infections are:",*infected,sep="\n" )