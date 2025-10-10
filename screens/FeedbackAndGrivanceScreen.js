import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, ScrollView, Alert, Image } from 'react-native';
import { Avatar, Card, Text, Button, Modal, Portal, TextInput, Divider, IconButton, Provider, Chip } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { submitFeedback, submitGrievance, getGrievances, getMunicipalities, getUserProfile } from '../src/api';

// --- Static Data Definitions ---
const DEPARTMENTS = ['Administration', 'Engineering', 'Education', 'Health', 'Finance', 'Local Governance'];
const GRIEVANCE_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

// Initial dummy data for display
const initialFeedback = [
    { id: 'f1', municipality: 'Kamalamai Municipality', rating: 5, comment: 'Excellent waste collection service this month.', date: '2025-09-01', department: 'Administration', imageUri: null, state: 'Bagmati' },
    { id: 'f2', municipality: 'Dudhauli Municipality', rating: 4, comment: 'Pothole repair was quick and effective.', date: '2025-09-15', department: 'Engineering', imageUri: null, state: 'Bagmati' },
];

const initialGrievance = [
    { id: 'g1', title: 'Street Light Outage', description: 'Street light broken on main road near Ward 2 office.', status: 'In Progress', date: '2025-10-01', department: 'Engineering', imageUri: 'https://picsum.photos/seed/grievance1/200/300', state: 'Bagmati' },
];

// --- Shared Utility Components ---
const StarRating = ({ rating }) => (
    <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
                key={star}
                icon={star <= rating ? 'star' : 'star-outline'}
                iconColor={star <= rating ? '#FFC107' : '#CCC'}
                size={20}
                style={{ margin: 0, padding: 0 }}
                onPress={() => {}}
            />
        ))}
    </View>
);

// --- Main Component ---
const FeedbackAndGrivanceScreen = ({ navigation }) => {
    const route = useRoute();
    const { districtName, municipalities: initialMunicipalities, state } = route.params || { districtName: 'District', municipalities: [], state: '' };

    const [activeTab, setActiveTab] = useState('Feedback');
    const [feedbackList, setFeedbackList] = useState(initialFeedback);
    const [grievanceList, setGrievanceList] = useState(initialGrievance);
    const [userProfile, setUserProfile] = useState(null);
    
    // Feedback Modal State
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [selectedMunicipality, setSelectedMunicipality] = useState(initialMunicipalities.length > 0 ? initialMunicipalities[0] : '');
    const [feedbackComment, setFeedbackComment] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackDepartment, setFeedbackDepartment] = useState(DEPARTMENTS[0]);
    const [feedbackImageUri, setFeedbackImageUri] = useState(null);

    // Grievance Modal State
    const [isGrievanceVisible, setIsGrievanceVisible] = useState(false);
    const [grievanceTitle, setGrievanceTitle] = useState('');
    const [grievanceDescription, setGrievanceDescription] = useState('');
    const [grievanceDepartment, setGrievanceDepartment] = useState(DEPARTMENTS[0]);
    const [grievanceImageUri, setGrievanceImageUri] = useState(null);

    // Selector Modal State
    const [isMunicipalitySelectorVisible, setIsMunicipalitySelectorVisible] = useState(false);
    const [isFeedbackDepartmentSelectorVisible, setIsFeedbackDepartmentSelectorVisible] = useState(false);
    const [isGrievanceDepartmentSelectorVisible, setIsGrievanceDepartmentSelectorVisible] = useState(false);

    // Effect to update selected municipality when the list changes
    useEffect(() => {
        if (initialMunicipalities.length > 0 && !selectedMunicipality) {
            setSelectedMunicipality(initialMunicipalities[0]);
        }
    }, [initialMunicipalities, selectedMunicipality]);

    // Effect to fetch user profile and grievances for officials
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const profile = await getUserProfile();
                setUserProfile(profile);
                if (profile.is_official) {
                    const grievances = await getGrievances();
                    setGrievanceList(grievances);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const showFeedbackModal = () => setIsFeedbackVisible(true);
    const hideFeedbackModal = () => {
        setFeedbackComment('');
        setFeedbackRating(0);
        setFeedbackDepartment(DEPARTMENTS[0]);
        setFeedbackImageUri(null);
        setIsFeedbackVisible(false);
    };
    
    const showGrievanceModal = () => setIsGrievanceVisible(true);
    const hideGrievanceModal = () => {
        setGrievanceTitle('');
        setGrievanceDescription('');
        setGrievanceDepartment(DEPARTMENTS[0]);
        setGrievanceImageUri(null);
        setIsGrievanceVisible(false);
    };

    // Function to simulate image picking
    const pickImage = (setImageUri) => {
        Alert.alert(
            "Add Image (Simulated)",
            "Enter a placeholder image URL (e.g., https://picsum.photos/200/300):",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: (url) => {
                        if (url) {
                            setImageUri(url);
                        }
                    }
                }
            ],
            "plain-text",
            "https://picsum.photos/200/300"
        );
    };

    // Submit feedback to backend
    const handleSubmitFeedback = async () => {
        if (feedbackRating === 0 || !feedbackComment || !selectedMunicipality || !feedbackDepartment) {
            Alert.alert("Missing Information", "Please provide a rating, select a municipality and department, and enter a comment.");
            return;
        }

        try {
            const feedbackData = {
                rating: feedbackRating,
                comment: feedbackComment,
                state: state,
            };
            await submitFeedback(selectedMunicipality, feedbackDepartment, feedbackData, feedbackImageUri ? { uri: feedbackImageUri, type: 'image/jpeg', fileName: 'image.jpg' } : null);
            Alert.alert('Success', 'Feedback submitted successfully');
            setFeedbackList([{
                id: `f${Date.now()}`,
                municipality: selectedMunicipality,
                rating: feedbackRating,
                comment: feedbackComment,
                date: new Date().toISOString().split('T')[0],
                department: feedbackDepartment,
                imageUri: feedbackImageUri,
                state: state,
            }, ...feedbackList]);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to submit feedback');
        }
        hideFeedbackModal();
    };

    // Submit grievance to backend
    const handleSubmitGrievance = async () => {
        if (!grievanceTitle || !grievanceDescription || !selectedMunicipality || !grievanceDepartment) {
            Alert.alert("Missing Information", "Please fill all fields and select a department.");
            return;
        }

        try {
            const grievanceData = {
                title: grievanceTitle,
                description: grievanceDescription,
                state: state,
            };
            await submitGrievance(selectedMunicipality, grievanceDepartment, grievanceData, grievanceImageUri ? { uri: grievanceImageUri, type: 'image/jpeg', fileName: 'image.jpg' } : null);
            Alert.alert('Success', 'Grievance submitted successfully');
            const updatedGrievances = await getGrievances();
            setGrievanceList(updatedGrievances);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to submit grievance');
        }
        hideGrievanceModal();
    };

    // Render selector list for municipalities and departments
    const renderSelectorList = (list, selectedValue, onSelect, hideModal) => (
        <ScrollView style={styles.selectorContent}>
            {list.map((value, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.selectOption}
                    onPress={() => {
                        onSelect(value);
                        hideModal();
                    }}
                >
                    <Text style={{ fontWeight: value === selectedValue ? 'bold' : 'normal', color: value === selectedValue ? '#303f9f' : '#333' }}>
                        {value}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    // NEW: Render Feedback Item
    const renderFeedbackItem = ({ item }) => (
        <Card style={styles.listItem}>
            <Card.Content>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.municipality}</Text>
                    <Chip style={styles.departmentChip}>{item.department}</Chip>
                </View>
                <Text style={styles.itemDate}>State: {item.state} | {item.date}</Text>
                <StarRating rating={item.rating} />
                <Text>{item.comment}</Text>
                {item.imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.imageLabel}>Attached Image:</Text>
                        <Image
                            source={{ uri: item.imageUri }}
                            style={styles.itemImage}
                            resizeMode="cover"
                        />
                    </View>
                )}
            </Card.Content>
        </Card>
    );

    // NEW: Render Grievance Item
    const renderGrievanceItem = ({ item }) => (
        <Card style={styles.listItem}>
            <Card.Content>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Chip style={styles.departmentChip}>{item.department}</Chip>
                </View>
                <Text style={styles.itemDate}>State: {item.state} | {item.date}</Text>
                <Text style={{ marginBottom: 8, color: '#555' }}>Status: {item.status}</Text>
                <Text>{item.description}</Text>
                {item.imageUri && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={styles.imageLabel}>Attached Image:</Text>
                        <Image
                            source={{ uri: item.imageUri }}
                            style={styles.itemImage}
                            resizeMode="cover"
                        />
                    </View>
                )}
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaProvider>
            <Provider>
                <SafeAreaView style={styles.container}>
                    <Text variant="headlineSmall" style={styles.title}>
                        {districtName} Feedback Hub
                    </Text>
                    
                    <View style={styles.tabContainer}>
                        <Button 
                            mode={activeTab === 'Feedback' ? 'contained' : 'outlined'}
                            onPress={() => setActiveTab('Feedback')}
                            style={styles.tabButton}
                        >
                            Feedback ({feedbackList.length})
                        </Button>
                        <Button 
                            mode={activeTab === 'Grievance' ? 'contained' : 'outlined'}
                            onPress={() => setActiveTab('Grievance')}
                            style={styles.tabButton}
                        >
                            Grievances ({grievanceList.length})
                        </Button>
                    </View>

                    <View style={styles.actionRow}>
                        <Button 
                            mode="contained" 
                            icon={activeTab === 'Feedback' ? 'plus' : 'alert-circle-outline'}
                            onPress={activeTab === 'Feedback' ? showFeedbackModal : showGrievanceModal}
                            style={styles.actionButton}
                        >
                            {activeTab === 'Feedback' ? 'Submit Feedback' : 'Report Grievance'}
                        </Button>
                    </View>

                    <Divider style={styles.divider} />

                    <Text style={styles.listTitle}>{activeTab} History</Text>
                    
                    {activeTab === 'Feedback' ? (
                        <FlatList
                            data={feedbackList}
                            renderItem={renderFeedbackItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text style={styles.emptyText}>No feedback submitted yet for {districtName}.</Text>}
                        />
                    ) : (
                        <FlatList
                            data={grievanceList}
                            renderItem={renderGrievanceItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<Text style={styles.emptyText}>No grievances reported yet for {districtName}.</Text>}
                        />
                    )}
                </SafeAreaView>

                {/* --- Feedback Submission Modal --- */}
                <Portal>
                    <Modal 
                        visible={isFeedbackVisible && !isMunicipalitySelectorVisible && !isFeedbackDepartmentSelectorVisible} 
                        onDismiss={hideFeedbackModal} 
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text variant="titleLarge" style={styles.modalTitle}>Submit Feedback for {districtName}</Text>
                            
                            <TextInput
                                label="State"
                                value={state}
                                mode="outlined"
                                style={styles.fixedInput}
                                editable={false}
                            />

                            <TextInput
                                label="Municipality"
                                value={selectedMunicipality}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsMunicipalitySelectorVisible(true)} />}
                                editable={false}
                            />
                            
                            <TextInput
                                label="Department to review"
                                value={feedbackDepartment}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsFeedbackDepartmentSelectorVisible(true)} />}
                                editable={false}
                            />

                            <Text style={styles.ratingText}>Rate the services:</Text>
                            <View style={styles.ratingRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <IconButton
                                        key={star}
                                        icon={star <= feedbackRating ? 'star' : 'star-outline'}
                                        iconColor={star <= feedbackRating ? '#FFC107' : '#CCC'}
                                        size={30}
                                        onPress={() => setFeedbackRating(star)}
                                    />
                                ))}
                            </View>

                            <TextInput
                                label="Your Comment"
                                placeholder="Share your experience and suggestions..."
                                value={feedbackComment}
                                onChangeText={setFeedbackComment}
                                mode="outlined"
                                multiline
                                numberOfLines={4}
                                style={{ marginBottom: 20 }}
                            />
                            
                            <View style={styles.imageUploadRow}>
                                <Button 
                                    mode="outlined" 
                                    icon="camera"
                                    onPress={() => pickImage(setFeedbackImageUri)}
                                    style={styles.imageButton}
                                >
                                    {feedbackImageUri ? 'Change Photo' : 'Add Photo (Optional)'}
                                </Button>
                                {feedbackImageUri && (
                                    <Chip 
                                        icon="check" 
                                        onClose={() => setFeedbackImageUri(null)}
                                        style={styles.imageChip}
                                    >
                                        Image Attached
                                    </Chip>
                                )}
                            </View>

                            <Button mode="contained" onPress={handleSubmitFeedback} style={styles.modalButton}>
                                Submit Feedback
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                
                <Portal>
                    <Modal 
                        visible={isMunicipalitySelectorVisible && (isFeedbackVisible || isGrievanceVisible)} 
                        onDismiss={() => setIsMunicipalitySelectorVisible(false)} 
                        contentContainerStyle={styles.selectorModalContainer}
                    >
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Municipality</Text>
                        {renderSelectorList(
                            initialMunicipalities, 
                            selectedMunicipality, 
                            setSelectedMunicipality, 
                            () => setIsMunicipalitySelectorVisible(false)
                        )}
                    </Modal>
                </Portal>

                <Portal>
                    <Modal 
                        visible={isFeedbackDepartmentSelectorVisible && isFeedbackVisible} 
                        onDismiss={() => setIsFeedbackDepartmentSelectorVisible(false)} 
                        contentContainerStyle={styles.selectorModalContainer}
                    >
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Department</Text>
                        {renderSelectorList(
                            DEPARTMENTS, 
                            feedbackDepartment, 
                            setFeedbackDepartment, 
                            () => setIsFeedbackDepartmentSelectorVisible(false)
                        )}
                    </Modal>
                </Portal>

                <Portal>
                    <Modal 
                        visible={isGrievanceVisible && !isMunicipalitySelectorVisible && !isGrievanceDepartmentSelectorVisible} 
                        onDismiss={hideGrievanceModal} 
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.modalContent}>
                            <Text variant="titleLarge" style={styles.modalTitle}>Report Grievance for {districtName}</Text>
                            
                            <TextInput
                                label="State"
                                value={state}
                                mode="outlined"
                                style={styles.fixedInput}
                                editable={false}
                            />

                            <TextInput
                                label="Municipality"
                                value={selectedMunicipality}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsMunicipalitySelectorVisible(true)} />}
                                editable={false}
                            />
                            
                            <TextInput
                                label="Relevant Department"
                                value={grievanceDepartment}
                                mode="outlined"
                                style={styles.fixedInput}
                                right={<TextInput.Icon icon="menu-down" onPress={() => setIsGrievanceDepartmentSelectorVisible(true)} />}
                                editable={false}
                            />

                            <TextInput
                                label="Grievance Title (e.g., Water Shortage, Road Damage)"
                                value={grievanceTitle}
                                onChangeText={setGrievanceTitle}
                                mode="outlined"
                                style={styles.fixedInput}
                            />
                            
                            <TextInput
                                label="Detailed Description"
                                placeholder="Provide location, date, and other relevant details..."
                                value={grievanceDescription}
                                onChangeText={setGrievanceDescription}
                                mode="outlined"
                                multiline
                                numberOfLines={5}
                                style={{ marginBottom: 20 }}
                            />
                            
                            <View style={styles.imageUploadRow}>
                                <Button 
                                    mode="outlined" 
                                    icon="camera"
                                    onPress={() => pickImage(setGrievanceImageUri)}
                                    style={styles.imageButton}
                                >
                                    {grievanceImageUri ? 'Change Photo' : 'Add Photo (Proof)'}
                                </Button>
                                {grievanceImageUri && (
                                    <Chip 
                                        icon="check" 
                                        onClose={() => setGrievanceImageUri(null)}
                                        style={styles.imageChip}
                                    >
                                        Image Attached
                                    </Chip>
                                )}
                            </View>

                            <Button mode="contained" onPress={handleSubmitGrievance} style={styles.modalButton}>
                                Submit Grievance
                            </Button>
                        </View>
                    </Modal>
                </Portal>

                <Portal>
                    <Modal 
                        visible={isGrievanceDepartmentSelectorVisible && isGrievanceVisible} 
                        onDismiss={() => setIsGrievanceDepartmentSelectorVisible(false)} 
                        contentContainerStyle={styles.selectorModalContainer}
                    >
                        <Text variant="titleMedium" style={styles.modalTitle}>Select Department</Text>
                        {renderSelectorList(
                            DEPARTMENTS, 
                            grievanceDepartment, 
                            setGrievanceDepartment, 
                            () => setIsGrievanceDepartmentSelectorVisible(false)
                        )}
                    </Modal>
                </Portal>
            </Provider>
        </SafeAreaProvider>
    );
};

// Styles remain the same
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center',
        marginVertical: 16,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    tabButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    divider: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    listItem: {
        marginVertical: 6,
        borderRadius: 10,
        elevation: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemTitle: {
        fontWeight: 'bold',
        color: '#303f9f',
        flexShrink: 1,
    },
    departmentChip: {
        height: 20,
        marginLeft: 8,
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    imagePreviewContainer: {
        marginTop: 10,
        marginBottom: 5,
        padding: 5,
    },
    imageLabel: {
        marginBottom: 5,
        color: '#555',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        maxHeight: '90%',
    },
    selectorModalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        maxHeight: '70%',
        elevation: 10,
    },
    modalContent: {
        padding: 10,
    },
    selectorContent: {
        padding: 10,
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    fixedInput: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    ratingText: {
        marginTop: 8,
        marginBottom: 4,
        fontWeight: '500',
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
        marginLeft: -12,
    },
    imageUploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    imageButton: {
        marginRight: 10,
    },
    imageChip: {
        backgroundColor: '#e8f5e9',
    },
    modalButton: {
        borderRadius: 8,
        paddingVertical: 4,
    },
    listTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#444',
        paddingHorizontal: 16,
    },
    selectOption: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }
});

export default FeedbackAndGrivanceScreen;