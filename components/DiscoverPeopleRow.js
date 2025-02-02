import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { fetchDiscoverPeopleData } from "../services/discoverPeople";

const DiscoverPeopleRow = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDiscoverPeopleData()
      .then((response) => {
        console.log("[DiscoverPeopleRow] response", response);
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handlePress = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {/* new section called discover people, with horizontal scrolling cards that contain profile pictures and names for people to add as friends */}
      <View className="flex-row justify-between px-5 pt-2">
        <Text className="text-white text-xl font-bold">Discover People</Text>
        <TouchableOpacity>
          <Text className="text-gray-500 text-lg font-semibold">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="py-5 px-2">
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex-row space-x-3"
        >
          {data.map((item, index) => (
            <View
              className="flex-col bg-slate-800 rounded-2xl"
              key={item.id || index}
            >
              {/* add an x in the top right corner to dismiss the current card */}
              {/* when pressed it will remove the item from the row and shift remaining cards left */}
              <TouchableOpacity onPress={() => handlePress(index)}>
                <View className="flex-row justify-end">
                  <XMarkIcon
                    position="absolute"
                    right={15}
                    top={15}
                    color={"rgb(100, 116, 139)"}
                  />
                </View>
              </TouchableOpacity>
              <View className="flex-row justify-around ml-8 mr-8">
                <Image
                  source={
                    item.user.profilePicture
                      ? { uri: item.user.profilePicture }
                      : {
                          uri: `https://ui-avatars.com/api/?name=${item.user.username}&background=808080&color=fff&size=256`,
                        }
                  }
                  className="w-20 h-20 rounded-full bg-opacity-90 m-4"
                />
              </View>
              <View className="flex-row justify-around">
                <Text
                  numberOfLines={1}
                  className="text-white text-md font-semibold"
                >
                  {item.user.username.length > 10
                    ? item.user.username.substring(0, 10) + "..."
                    : item.user.username}
                </Text>
              </View>
              <View className="flex-row justify-around">
                <Text
                  numberOfLines={1}
                  className="text-white text-md font-semibold"
                >
                  {item.user.bio}
                </Text>
              </View>
              <View>
                {/* touchable follow button */}
                <TouchableOpacity>
                  <View className="flex-row justify-center bg-gray-700 rounded-2xl p-2 m-2">
                    <Text className="text-white font-semibold">Follow</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default DiscoverPeopleRow;
