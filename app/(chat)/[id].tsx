// app/(chat)/[id].tsx
import { colors } from "@/constants/theme";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
}

const mockChat = {
  name: "Technician Alex",
  avatar: "https://ui-avatars.com/api/?name=Alex&background=2563eb&color=fff",
  messages: [
    { id: "1", text: "Hi, I am on my way!", time: "09:30 AM", sent: false },
    { id: "2", text: "Great, thank you!", time: "09:31 AM", sent: true },
    {
      id: "3",
      text: "I will arrive in 20 minutes.",
      time: "09:32 AM",
      sent: false,
    },
    { id: "4", text: "Okay, see you soon.", time: "09:33 AM", sent: true },
    {
      id: "5",
      text: "Perfect! I'll be waiting. Should I prepare anything specific for the service?",
      time: "09:34 AM",
      sent: true,
    },
    {
      id: "6",
      text: "No need to prepare anything. I have all the tools and equipment with me.",
      time: "09:35 AM",
      sent: false,
    },
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

  const handleInputFocus = () => {
    // Scroll to bottom when keyboard appears or when focusing on input
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    // Auto-scroll when new messages are added
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    // Keyboard event listeners for better UX
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sent ? styles.sentContainer : styles.receivedContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.sent ? styles.sentBubble : styles.receivedBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sent ? styles.sentText : styles.receivedText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.sent ? styles.sentTime : styles.receivedTime,
          ]}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Image
            source={{
              uri: typeof avatar === "string" ? avatar : mockChat.avatar,
            }}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>
              {typeof name === "string" ? name : mockChat.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.headerAction}>
            <Feather name="more-vertical" size={20} color={colors.primary} />
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
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={setInput}
              onFocus={handleInputFocus}
              multiline
              maxLength={1000}
            />
          </View>
          {input.trim() ? (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Feather name="send" size={18} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.voiceButton}>
              <Feather name="mic" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 2,
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
    fontWeight: "600",
    color: "#111827",
  },
  headerAction: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  messagesList: {
    paddingVertical: 8,
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  sentContainer: {
    alignItems: "flex-end",
  },
  receivedContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sentBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 2,
  },
  receivedBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  sentText: {
    color: "#fff",
  },
  receivedText: {
    color: "#111827",
  },
  messageTime: {
    fontSize: 11,
    alignSelf: "flex-end",
    marginTop: 2,
  },
  sentTime: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  receivedTime: {
    color: "#6b7280",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    textAlignVertical: "center",
    paddingVertical: Platform.OS === "ios" ? 8 : 0,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  voiceButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
