// app/(chat)/[id].tsx
import { fonts } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
}

const mockChat = {
  name: "Sujan Shrestha",
  avatar: "https://ui-avatars.com/api/?name=Sujan&background=6b7280&color=fff",
  status: "Online",
  messages: [
    { id: "1", text: "Hi! I'm on my way to your location", time: "2:30 PM", sent: false },
    { id: "2", text: "Great, thank you!", time: "2:31 PM", sent: true },
    { id: "3", text: "I'll arrive in about 15 minutes", time: "2:32 PM", sent: false },
    { id: "4", text: "Perfect, I'll be here", time: "2:33 PM", sent: true },
    { id: "5", text: "Should I prepare anything for the repair?", time: "2:34 PM", sent: true },
    { id: "6", text: "No need! I have all the tools and parts with me 🛠️", time: "2:35 PM", sent: false },
  ],
};

const Chat = () => {
  const router = useRouter();
  const { name, avatar } = useLocalSearchParams<{
    name?: string;
    avatar?: string;
  }>();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockChat.messages);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return () => keyboardDidShowListener?.remove();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sent: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sent ? styles.sentContainer : styles.receivedContainer]}>
      <View style={[styles.messageBubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
        <Text style={[styles.messageText, item.sent ? styles.sentText : styles.receivedText]}>
          {item.text}
        </Text>
        <Text style={[styles.messageTime, item.sent ? styles.sentTime : styles.receivedTime]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#374151" />
            </TouchableOpacity>
            
            <Image
              source={{ uri: typeof avatar === "string" ? avatar : mockChat.avatar }}
              style={styles.avatar}
            />
            
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>
                {typeof name === "string" ? name : mockChat.name}
              </Text>
              <Text style={styles.headerStatus}>{mockChat.status}</Text>
            </View>
            
            <TouchableOpacity style={styles.callButton}>
              <Feather name="phone" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <View style={styles.messagesContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={renderMessage}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                placeholder="Type a message..."
                placeholderTextColor="#9ca3af"
                multiline
                maxLength={1000}
              />
            </View>
            {input.trim() ? (
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Feather name="send" size={18} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.attachButton}>
                <Feather name="paperclip" size={18} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontFamily: fonts.semiBold || fonts.bold,
    color: "#111827",
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: "#6b7280",
    marginTop: 2,
  },
  callButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  messagesList: {
    paddingVertical: 16,
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginVertical: 3,
  },
  sentContainer: {
    alignItems: "flex-end",
  },
  receivedContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sentBubble: {
    backgroundColor: "#3b82f6",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginBottom: 4,
  },
  sentText: {
    color: "#ffffff",
  },
  receivedText: {
    color: "#111827",
  },
  messageTime: {
    fontSize: 11,
    fontFamily: fonts.regular,
    alignSelf: "flex-end",
  },
  sentTime: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  receivedTime: {
    color: "#9ca3af",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
    maxHeight: 100,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: "#111827",
    textAlignVertical: "center",
    paddingVertical: Platform.OS === "ios" ? 2 : 0,
  },
  sendButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  attachButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});